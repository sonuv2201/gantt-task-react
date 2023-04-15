import React, { useEffect, useState } from "react";
import styles from "./task-list-header.module.css";
import { Task } from "../../types/public-types";
// import { ExtraFieldType } from "../../types/public-types";

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  tasks?: Task[];
}> = ({ headerHeight, fontFamily, fontSize, rowWidth, tasks }) => {

  const [customLabel,setCustomLabel] = useState('Team');

  useEffect(()=>{
    tasks?.map(t => {
      setCustomLabel(t?.extraFieldLabel)
    })
  },[])

  return (
    <div
      className={styles.ganttTable}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div
        className={styles.ganttTable_Header}
        style={{
          height: headerHeight - 2,
        }}
      >
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;Name
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.2,
          }}
        />
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;From
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;To
        </div>

        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;{customLabel || "Team"}
        </div>

        {/* {tasks?.map(t => {
          return (
            t?.extraField?.map((fItem: ExtraFieldType, index: number) => {
              if (fItem?.visibleTable) {
                return <div
                  key={index}
                  className={styles.ganttTable_HeaderItem}
                  style={{
                    minWidth: rowWidth,
                  }} 
                >
                  {fItem.label}
                </div>
              } else {
                return null
              }

            })
          )
        })} */}


      </div>
    </div>
  );
};
