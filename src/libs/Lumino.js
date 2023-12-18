import React, { Component }            from "react";
import { createPortal }                from 'react-dom';
import { DockPanel, BoxPanel, Widget, TabBar } from "@lumino/widgets";
import LuminoWidgetClass               from './LuminoWidget';
import clsx from "clsx";

// Serialize layout helper functions
function serializeWidget(widget) {
  return widget.toJSON();
}

function serializaNode(node){
  switch(node.type){
    case "tab-area":      { return serializeTabArea(node);   }
    case "split-area":    { return serializeSplitArea(node); }
    case "lumino-widget": { return serializeWidget(node);    }
    default: {
      throw new Error(`Unsupported node type: ${node.type}`);
    }
  }
}

function serializeTabArea(child) {
  const { currentIndex, type, widgets } = child;
  return { currentIndex, type, widgets: widgets.map(serializaNode) };
}

function serializeSplitArea(child){
  const { orientation, sizes, type, children } = child;
  return { orientation, sizes, type, children: children.map(serializaNode) }
}

function serializeLayout(dock) {
  const { main } = dock.saveLayout();
  const { type, orientation, children, widgets, sizes, currentIndex } = main || {};
  return {
    type,
    ...(typeof currentIndex === "number" ? { currentIndex } : {}),
    ...(sizes        ? { sizes }        : {}),
    ...(orientation  ? { orientation }  : {}),
    ...(children ? {children: children.map( serializaNode )}          : {}),
    ...(widgets  ? {widgets:  widgets.map( w => serializeWidget(w) )} : {}),
  };
}



// Deserialize layout helper functions
function deserializeWidget(widget, widgets_map) {
  return widgets_map[widget.id];
}

function deserializaNode(node, widgets_map){
  switch(node.type){
    case "tab-area":      { return deserializeTabArea(node, widgets_map);   }
    case "split-area":    { return deserializeSplitArea(node, widgets_map); }
    case "lumino-widget": { return deserializeWidget(node, widgets_map);    }
    default: {
      throw new Error(`Unsupported node type: ${node.type}`);
    }
  }
}

function deserializeTabArea(child, widgets_map) {
  const { currentIndex, type, widgets } = child;
  return { currentIndex, type, widgets: widgets.map(c => deserializaNode(c, widgets_map)) };
}

function deserializeSplitArea(child, widgets_map){
  const { orientation, sizes, type, children } = child;
  return { orientation, sizes, type, children: children.map(c => deserializaNode(c, widgets_map)) };
}

function deserializeLayout(dock, layout, widgets_map) {
  const { type, orientation, children, widgets, sizes, currentIndex } = layout;
  const deserialized = {
    main: {
      type,
      ...(typeof currentIndex === "number" ? { currentIndex } : {}),
      ...(sizes        ? { sizes }        : {}),
      ...(orientation  ? { orientation }  : {}),
      ...(children     ? {children: children .map( c => deserializaNode(c, widgets_map) )}   : {}),
      ...(widgets      ? {widgets:  widgets  .map( w => deserializeWidget(w, widgets_map) )} : {}),
    }
  };

  dock.restoreLayout(deserialized);
}



export class LuminoLayout extends Component {
  
  constructor(props){
    super(props);
    this.luminoListeners = {};
    this.state = { 
      context: {
        addWidget:    this.addWidget.bind(this),
        updateWidget: this.updateWidget.bind(this),
        removeWidget: this.removeWidget.bind(this),
        // lockWidget:   this.lockWidget.bind(this),
      },
  };
    this.widgets = {};
    this.widgets_initialized = false;
  }

  componentWillUnmount(){
    // Cleanup event handlers
    this.state.container.removeEventListener("lumino:updated", this.luminoListeners.updated);
    window.removeEventListener("resize", this.luminoListeners.resized);
  }

  setContainer(container){
    if(this.state.container) return;

    const dock = new DockPanel({
      // addButtonEnabled: true
    });
    const main = new BoxPanel({ direction: "left-to-right", spacing: 0, id: this.props.id });

    main.id = this.props.id;
    main.addClass("main");
    dock.id = this.props.id + '-dock';

    window.dock = dock;

    BoxPanel.setStretch(dock, 1);
    Widget.attach(main, container);
    main.addWidget(dock);

    window.addEventListener("resize", this.luminoListeners.resized = (e) => {
      main.update();
    });

    let debounce = 0, initial = true;
    container.addEventListener("lumino:updated", this.luminoListeners.updated = () => {
      // Block initial update
      if(initial) return setTimeout( () => {initial = false});
      
      if(debounce) clearTimeout(debounce);
      debounce = setTimeout( () => {
        debounce = 0;
        this.handleUpdate();
      }, 500 );
    });

    container.addEventListener("lumino:actived", this.luminoListeners.updated = (e) => {
      // Block initial update
      if(initial) return setTimeout( () => {initial = false});
      
      if(debounce) clearTimeout(debounce);
      debounce = setTimeout( () => {
        debounce = 0;
        this.handleActvied(e);
      }, 500 );
    });

    this.setState({
      container,
      dock,
      main,
      context: Object.assign(this.state.context, { container, dock, main }),
    });      
  }

  handleUpdate(e){
    this.layout = serializeLayout(this.state.dock);
    this.props.onUpdate && this.props.onUpdate(this.layout, e);
  }

  handleActvied(e){
    this.props.onActived && this.props.onActived(e);
  }

  UNSAFE_componentWillReceiveProps({layout, hidden}){
    this.state.dock.setHidden(hidden);
    if(JSON.stringify(this.layout) === JSON.stringify(layout)) return;
    this.applyLayout(layout);
    this.layout = layout;
  }

  applyLayout(layout){
    layout && deserializeLayout(this.state.dock, layout, this.widgets);
  }

  addWidget(id, name, closable, container, className) {
    const lum = new LuminoWidgetClass(id, name, this.state.container, closable, container, className);
    this.state.dock.addWidget( lum, { mode: "split-bottom" });
    this.widgets[id] = lum;

    if(!this.widgets_initialized){
      // It is first widget after initializing layout, so
      // as they will be added in current stack, defer call
      // of the collection function to collect all initial widgets instances
      this.widgets_initialized = true;
      this.props.layout && setTimeout(() => this.applyLayout(this.props.layout), 0);
    }
    else {
      // If it is not initial, we need to trigger update procedure
      // as lumino may not trigger update if layout does not fit
      // container
      lum.onActivateRequest();
    }

    return lum;
  }

  updateWidget(widget){
    // this.container.update();
  }

  removeWidget(widget){
    widget.dispose();
  }

  render(){
    const { children } = this.props;
    return (
      <LuminoWidget.contextType.Provider 
        value={{
        ...this.state.context, 
      }}>
        <div 
          ref={ this.setContainer.bind(this) }
          className={clsx("luminoBox", this.props.className)}
        >
          { /* this.state.dock && children */ }
        </div>
        <div>
          { this.state.dock && children }
        </div>
      </LuminoWidget.contextType.Provider>
    )
  }
}

export class LuminoWidget extends Component {
  
  constructor(props){
    super(props);
    this.state = {};
    this.setContainer = this.setContainer.bind(this);
    this.luminoListeners = {};
  }

  componentWillUnmount(){
    this.domNode.removeEventListener("lumino:deleted", this.luminoListeners.deleted);
    this.context.removeWidget(this.luminoWidget);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.context.updateWidget(this.props.id, /* ... */);
  }

  setContainer(container){
    if(this.state.container) return;
    this.luminoWidget = this.context.addWidget(this.props.id, this.props.title, this.props.closable, container, this.props.className);
    container.addEventListener("lumino:deleted", this.luminoListeners.deleted = (e) => {
      this.props.onDelete && this.props.onDelete(e);
      this.luminoWidget.onActivateRequest(); // Need to trigger update on entire layout
    });
  }

  get domNode(){
    if(this.__domNode) return this.__domNode;
    this.__domNode = document.createElement("div");
    this.setContainer(this.__domNode);
    return this.__domNode;
  }

  render(){
    return createPortal( this.props.children, this.domNode );
  }
}

LuminoWidget.contextType = React.createContext({});
export const LuminiWidgetConsumer = LuminoWidget.contextType.Consumer;
