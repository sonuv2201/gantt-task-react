import React, { useEffect, useState } from "react";
import styles from "./task-list-header.module.css";
import { Task } from "../../types/public-types";
// import { ExtraFieldType } from "../../types/public-types";
import { GantContext } from "../gantt/gantt";

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  tasks?: Task[];
}> = ({ headerHeight, fontFamily, fontSize, rowWidth, tasks }) => {

  const [customLabel, setCustomLabel] = useState('Team');

  useEffect(() => {
    tasks?.map(t => {
      setCustomLabel(t?.extraFieldLabel)
    })
  }, [])

  const LocalContext = React.useContext(GantContext);
  const { propsColumn } = LocalContext;


  return (
    <div
      className={`${styles.ganttTable} ganttTable`}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div
        className={`${styles.ganttTable_Header} ganttTable_Header`}
        style={{
          height: headerHeight - 2,
        }}
      >
        <div
          className={`${styles.ganttTable_HeaderItem} ganttTable_HeaderItem name`}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;Name
        </div>
        {/* <div className={`${styles.ganttTable_HeaderSeparator} ganttTable_HeaderSeparator`}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.2,
          }}
        /> */}

        {propsColumn && propsColumn?.columns?.includes('start') &&
          <div
            className={`${styles.ganttTable_HeaderItem} ganttTable_HeaderItem start`}
            style={{
              minWidth: rowWidth,
            }}
          >
            From
          </div>
        }

        {/* <div className={`${styles.ganttTable_HeaderSeparator} ganttTable_HeaderSeparator`}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        /> */}

        {propsColumn && propsColumn?.columns?.includes('end') &&
          <div
            className={`${styles.ganttTable_HeaderItem} ganttTable_HeaderItem end`}
            style={{
              minWidth: rowWidth,
            }}
          >
            To
          </div>
        }


        {propsColumn && propsColumn?.columns?.includes('team') &&
          <div
            className={`${styles.ganttTable_HeaderItem} ganttTable_HeaderItem team`}
            style={{
              minWidth: rowWidth,
            }}
          >
            {customLabel || "Team"}
          </div>
        }

        {propsColumn && propsColumn?.columns?.includes('progress') &&
          <div
            className={`${styles.ganttTable_HeaderItem} ganttTable_HeaderItem progress`}
            style={{
              minWidth: rowWidth,
            }}
          >
            Progress
          </div>
        }

        {propsColumn && propsColumn?.columns?.includes('duration') &&
          <div
            className={`${styles.ganttTable_HeaderItem} ganttTable_HeaderItem duration`}
            style={{
              minWidth: rowWidth,
            }}
          >
            Duration
          </div>
        }

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
