import React, { useEffect, useRef, useState } from "react";
import { BarTask } from "../../types/bar-task";
import { GanttContentMoveAction } from "../../types/gantt-task-actions";
import { Bar } from "./bar/bar";
import { BarSmall } from "./bar/bar-small";
import { Milestone } from "./milestone/milestone";
import { Project } from "./project/project";
import style from "./task-list.module.css";

export type TaskItemProps = {
  task: BarTask;
  arrowIndent: number;
  taskHeight: number;
  isProgressChangeable: boolean;
  isDateChangeable: boolean;
  isDelete: boolean;
  isSelected: boolean;
  rtl: boolean;
  onEventStart: (
    action: GanttContentMoveAction,
    selectedTask: BarTask,
    event?: React.MouseEvent | React.KeyboardEvent
  ) => any;
};

export const TaskItem: React.FC<TaskItemProps> = props => {
  const {
    task,
    arrowIndent,
    isDelete,
    taskHeight,
    isSelected,
    rtl,
    onEventStart,
  } = {
    ...props,
  };
  const textRef = useRef<SVGTextElement>(null);
  const [taskItem, setTaskItem] = useState<JSX.Element>(<div />);
  const [isTextInside, setIsTextInside] = useState(true);

  useEffect(() => {
    switch (task.typeInternal) {
      case "milestone":
        setTaskItem(<Milestone {...props} />);
        break;
      case "project":
        setTaskItem(<Project {...props} />);
        break;
      case "smalltask":
        setTaskItem(<BarSmall {...props} />);
        break;
      default:
        setTaskItem(<Bar {...props} />);
        break;
    }
  }, [task, isSelected]);

  useEffect(() => {
    if (textRef.current) {
      setIsTextInside(textRef.current.getBBox().width < task.x2 - task.x1);
    }
  }, [textRef, task]);

  const getX = () => {
    const width = task.x2 - task.x1;
    const hasChild = task.barChildren.length > 0;
    if (isTextInside) {
      return task.x1 + width * 0.5;
    }
    if (rtl && textRef.current) {
      return (
        task.x1 -
        textRef.current.getBBox().width -
        arrowIndent * +hasChild -
        arrowIndent * 0.2
      );
    } else {
      return task.x1 + width + arrowIndent * +hasChild + arrowIndent * 0.2;
    }
  };

  const groupRef = useRef<SVGTextElement>(null);

  return (
    <g
      onKeyDown={e => {
        switch (e.key) {
          case "Delete": {
            if (isDelete) onEventStart("delete", task, e);
            break;
          }
        }
        e.stopPropagation();
      }}
      onMouseEnter={e => {
        onEventStart("mouseenter", task, e);
      }}
      onMouseLeave={e => {
        onEventStart("mouseleave", task, e);
      }}
      onDoubleClick={e => {
        onEventStart("dblclick", task, e);
      }}
      onClick={e => {
        onEventStart("click", task, e);
      }}
      onFocus={() => {
        onEventStart("select", task);
      }}
    >
      {taskItem}
      <g
        x={getX()}
        y={task.y + taskHeight * 0.5}
        className={
          isTextInside
            ? style.barLabel
            : style.barLabel && style.barLabelOutside
        }
        ref={textRef}
      >
        <text
          x={getX()}
          y={task.y + taskHeight * 0.5}
          ref={groupRef}
        >
          {task.name}
        </text>

        {task?.team?.map((item, index) => {

          let old_X = getX();
          if (groupRef.current && isTextInside) {
            old_X = old_X + (groupRef?.current.getBBox().width) / 2 - 10;
          } else if (groupRef.current) {
            old_X = old_X + (groupRef?.current.getBBox().width) - 10;
          }

          let new_X = old_X + (25 * (index + 1));
          old_X = 0;

          let fillBG = 'red';
          let fillColor = 'white';

          switch(index){
            case 0: fillBG = item.background ? item.background : '#f44336'; fillColor = item.color ? item.color : '#fff'; break;
            case 1: fillBG = item.background ? item.background : '#e91e63'; fillColor = item.color ? item.color : '#fff'; break;
            case 2: fillBG = item.background ? item.background : '#9c27b0'; fillColor = item.color ? item.color : '#fff'; break;
            case 3: fillBG = item.background ? item.background : '#009688'; fillColor = item.color ? item.color : '#fff'; break;
            case 4: fillBG = item.background ? item.background : '#4caf50'; fillColor = item.color ? item.color : '#fff'; break;
            case 5: fillBG = item.background ? item.background : '#8bc34a'; fillColor = item.color ? item.color : '#fff'; break;
            case 6: fillBG = item.background ? item.background : '#795548'; fillColor = item.color ? item.color : '#fff'; break;
            case 7: fillBG = item.background ? item.background : '#ff9800'; fillColor = item.color ? item.color : '#fff'; break;
            case 8: fillBG = item.background ? item.background : '#ff5722'; fillColor = item.color ? item.color : '#fff'; break;
            case 9: fillBG = item.background ? item.background : '#3f51b5'; fillColor = item.color ? item.color : '#fff'; break;
          }
          return (<g key={index}>
            {
              isTextInside ?
                <g>
                  <circle style={{ fill: fillBG }} cx={new_X} cy={task.y + taskHeight * 0.5} r="10"> </circle>
                  <text x={new_X} y={task.y + taskHeight * 0.5} fontSize="0.5em" fill={fillColor} >{item.initial}</text>
                </g>
                :
                item?.initial && item?.initial.length === 1 ?
                <g>
                  <circle style={{ fill: fillBG }} cx={new_X + 2} cy={(task.y + taskHeight * 0.5) - 3} r="10"> </circle>
                  <text x={new_X - 1} y={task.y + taskHeight * 0.5} fontSize="0.5em" fill={fillColor} >{item.initial}</text>
                </g>
                :
                <g>
                <circle style={{ fill: fillBG }} cx={new_X + 3} cy={(task.y + taskHeight * 0.5) - 3} r="10"> </circle>
                <text x={new_X - 1} y={task.y + taskHeight * 0.5} fontSize="0.5em" fill={fillColor} >{item.initial}</text>
              </g>
            }

          </g>)

        }
        )}
      </g>
    </g>
  );
};

