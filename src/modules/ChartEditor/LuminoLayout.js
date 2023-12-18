import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import clsx from "clsx";

// libs
import { LuminoLayout, LuminoWidget, LuminiWidgetConsumer } from '../../libs/Lumino';

// selectors
import { isLauncherOpenSelector } from 'selectors/app.selector';
import { tabsSelector, tabArraySelector } from 'selectors/tabs.selector';

// actions
import { openLauncher } from "reducer/app.reducer";

// actions
import { switchTab, removeTabChart } from 'reducer/tabs.reducer';

// components
import LuminoLauncher from "./LuminoPanel/LauncherLumino";
import ChartLumino from "./LuminoPanel/ChartLumino";

export default function LuminoComponent() {
  // hooks
  const dispatch = useDispatch();
  // selector
  const isLauncherOpen = useSelector(isLauncherOpenSelector);
  const state = useSelector(state => state);
  const tabArray = useSelector(tabArraySelector);
  const tabs = useSelector(tabsSelector);

  function handleActiveTab(tabId) {
    if(!tabId) return;
    dispatch(switchTab(Number(tabId)));
  }

  return (
    <LuminoLayout
      id={123}
      layout={null}
      onActived={e => {
        handleActiveTab(e?.detail?.id);
        // console.log("onActived", {
        //   detail: e?.detail,
        //   actionType: e?.detail?.actionType,
        // });
      }}
      onUpdate={(layout) => {
        console.log("onUpdate", { layout });
      }}
      className={clsx(
        "luminoLayout_container",
      )}
    >
      <LuminiWidgetConsumer>
        {() => {
          return (
            <>
              {isLauncherOpen && (
                <LuminoWidget
                  id="launcher"
                  closable={true}
                  title="Launcher"
                  className={clsx(
                    "drag-safe",
                    "luminoWidget_box",
                  )}
                  onDelete={() => {
                    dispatch(openLauncher(false));
                  }}
                >
                  <LuminoLauncher />
                </LuminoWidget>
              )}
              {tabs.map((tabItem) => (
                <LuminoWidget
                  key={`workspace-${tabItem.id}`}
                  id={tabItem.id}
                  closable={true}
                  title={tabItem.name}
                  className={clsx(
                    "drag-safe",
                    "luminoWidget_box",
                  )}
                  onDelete={e => {
                    console.log("onDelete", Number(e.target.id));
                    dispatch(removeTabChart(Number(e.target.id)))
                  }}
                >
                  <ChartLumino tabItem={tabItem} />
                </LuminoWidget>
              ))}

            </>
          )
        }}
      </LuminiWidgetConsumer>

    </LuminoLayout>
  )
}