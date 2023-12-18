import { Widget } from "@lumino/widgets";

const returnTrue  = () => true;
const returnFalse = () => false;

export default class LuminoWidget extends Widget {
  constructor(id, name, mainRef, closable, node = LuminoWidget.createNode(id), className) {
    super({ node });
    this.id = id;
    this.name = name;
    this.nodeRef = node;
    this.mainRef = mainRef;
    this.closable = closable;
    this.type = "lumino-widget";

    this.setFlag(Widget.Flag.DisallowLayout);
    this.addClass("content");
    this.addClass("lumino-content");

    if(className){
      const classes = className.split(/\s+/);
      for(let class_name of classes) this.addClass(class_name);
    }

    this.title.label = name; // this sets the tab name
    // this.title.dataset['truowng-test2'] = id;
    this.title.closable = closable;
    // this.title.iconLabel = iconLabel;
  }

  toJSON(){
    const { id, title, type } = this;
    return { id, title: title.label, type };
  }

  static createNode(id) {
    const div = document.createElement("div");
    div.setAttribute("id", id);
    return div;
  }

  onCloseRequest(msg) {
    // create custom event
    const event = new CustomEvent("lumino:deleted");
    // Override preventDefault and isDefaultPrevented as they
    // does not work well with custom events
    event.isDefaultPrevented = returnFalse;
    event.preventDefault = () => { event.isDefaultPrevented = returnTrue };
    // fire custom event to element
    this.nodeRef.dispatchEvent(event);
    // Detect event.preventDefault() is called
    if(!event.isDefaultPrevented()) super.onCloseRequest(msg);
  }

  onCloseRequestSingle(msg) {
    super.onCloseRequest(msg);
  }

  onResize (msg){
    // Lumino makes initial onResize call
    if(!this.__onreset_initialized) return this.__onreset_initialized = true;
    // return console.log("onActivateRequest", this.id, msg);
    // create custom event
    // console.log("onResize", this.id);
    const event = new CustomEvent("lumino:updated");
    event.isDefaultPrevented = returnFalse;
    event.preventDefault = () => { event.isDefaultPrevented = returnTrue };
    // fire custom event to parent element


    // console.log("lumino:updated", msg);
    this.mainRef.dispatchEvent(event);
    // continue with normal Widget behaviour
    super.onResize(msg);
  }

  onActivateRequest(msg) {
    // create custom event
    const event = new CustomEvent("lumino:actived", {
      detail: {
        id: this.id,
        name: this.name,
        closable: this.closable,
        actionType: 'active-tab'
      },
    });
    event.isDefaultPrevented = returnFalse;
    event.preventDefault = () => { event.isDefaultPrevented = returnTrue };
    this.mainRef.dispatchEvent(event);
    // continue with normal Widget behaviour
    if(!event.isDefaultPrevented() && msg) super.onActivateRequest(msg);


    // updated
    // // create custom event
    // const event = new CustomEvent("lumino:updated", {
    //   detail: {
    //     id: this.id,
    //     name: this.name,
    //     closable: this.closable,
    //     actionType: 'active-tab'
    //   },
    // });
    // event.isDefaultPrevented = returnFalse;
    // event.preventDefault = () => { event.isDefaultPrevented = returnTrue };
    // this.mainRef.dispatchEvent(event);
    // // continue with normal Widget behaviour
    // if(!event.isDefaultPrevented() && msg) super.onActivateRequest(msg);
    
  }

  getEventDetails() {
    return {
      detail: {
        id: this.id,
        name: this.name,
        closable: this.closable,
      },
    };
  }
}
