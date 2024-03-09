import React from 'react'
import './Container.css'
import SampleSplitter from "../spilt/SampleSplitter";
import { useResizable } from "react-resizable-layout";
import {cn} from '../../utils/cn';
import UpdateData from '../UpdateData';
import AddData from '../AddData';
import Count from '../Count';

const Container = () => {

    const {
        isDragging: isTerminalDragging,
        position: terminalH,
        splitterProps: terminalDragBarProps
      } = useResizable({
        axis: "y",
        initial: 150,
        min: 50,
        reverse: true
      });
      const {
        isDragging: isFileDragging,
        position: fileW,
        splitterProps: fileDragBarProps
      } = useResizable({
        axis: "x",
        initial: 250,
        min: 50
      });
      const {
        isDragging: isPluginDragging,
        position: pluginW,
        splitterProps: pluginDragBarProps
      } = useResizable({
        axis: "x",
        initial: 200,
        min: 50,
        reverse: true
      });

  return (
    <div
    className={
      "flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"
    }
  >
    <div className={"flex grow"}>
      <div
        className={cn("shrink-0 contents", isFileDragging && "dragging")}
        style={{ width: fileW }}
      >
       <Count/>
      </div>
      <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
      <div className={"flex grow"}>
        <div className={"grow bg-darker contents"}>
        <AddData/>
        </div>
        <SampleSplitter
          isDragging={isPluginDragging}
          {...pluginDragBarProps}
        />
      </div>
    </div>
    <SampleSplitter
      dir={"horizontal"}
      isDragging={isTerminalDragging}
      {...terminalDragBarProps}
    />
    <div
      className={cn(
        "shrink-0 bg-darker contents",
        isTerminalDragging && "dragging"
      )}
      style={{ height: terminalH }}
    >
      <UpdateData/>
    </div>
  </div>
  )
}

export default Container