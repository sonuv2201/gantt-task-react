import React, { useMemo } from "react";
import styles from "./task-list-table.module.css";
import { Task } from "../../types/public-types";
import { ExtraFieldType } from "../../types/public-types";
const localeDateStringCache = {};
const toLocaleDateStringFactory =
  (locale: string) =>
    (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
      const key = date.toString();
      let lds = localeDateStringCache[key];
      if (!lds) {
        lds = date.toLocaleDateString(locale, dateTimeOptions);
        localeDateStringCache[key] = lds;
      }
      return lds;
    };
const dateTimeOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const TaskListTableDefault: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  onExpanderClick,
}) => {
    const toLocaleDateString = useMemo(
      () => toLocaleDateStringFactory(locale),
      [locale]
    );

    return (
      <div
        className={styles.taskListWrapper}
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
        }}
      >
        {tasks.map(t => {
          let expanderSymbol = "";
          // let teamOpen = false;
          if (t.hideChildren === false) {
            expanderSymbol = "▼";
          } else if (t.hideChildren === true) {
            expanderSymbol = "▶";
          }
          
          return (
            <div
              className={styles.taskListTableRow}
              style={{ height: rowHeight }}
              key={`${t.id}row`}
            >
              <div
                className={styles.taskListCell}
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
                title={`${t.name}`}
              >
                <div className={styles.taskListNameWrapper}>
                  <div
                    className={
                      expanderSymbol
                        ? styles.taskListExpander
                        : styles.taskListEmptyExpander
                    }
                    onClick={() => onExpanderClick(t)}
                  >
                    {expanderSymbol}
                  </div>
                  <div>{t.name}</div>
                </div>
              </div>
              <div
                className={styles.taskListCell}
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
              >
                &nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
              </div>
              <div
                className={styles.taskListCell}
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
              >
                &nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
              </div>


              <div
                className={styles.taskListCell}
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                  position:'relative'
                }}
              >
                <DisplayExtraFiled t={t} rowWidth={rowWidth} /> 
              </div>

              {/* {
              t?.extraField.map((item:any,index:number)=>{
                return(<div
                  key={index}
                  className={styles.taskListCell}
                  style={{
                    minWidth: rowWidth,
                    maxWidth: rowWidth,
                  }}
                >
                  &nbsp;  
                </div>)
              })
            } */}


            </div>
          );
        })}
      </div>
    );
  };



  const DisplayExtraFiled = ({t,rowWidth}:any) =>{
    let [teamOpen,setTeamOpen] = React.useState(false)

    const listRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(()=>{
      document.addEventListener('click',clickHandle)
    },[])

    const clickHandle = (event:any) =>{
      if(listRef.current && !listRef.current.contains(event.target)){
        setTeamOpen(false);
      }
    }
    
    return(<div className={`childList ${teamOpen ? 'active' : ''}`} ref={listRef}>
    {
      t?.extraField?.map((fItem: ExtraFieldType, index: number,arr:any) => {
        if (fItem?.visibleTable) {
          return <div
            key={index}

            style={{
              minWidth: rowWidth,
              maxWidth: rowWidth,
            }}
          >
            { index === 0 &&  <p onClick={()=> setTeamOpen((prev)=>!prev) } style={{cursor:"pointer",marginBottom:teamOpen ?'0' : '14px'}}>{teamOpen ? '▼' : '▶'}  {fItem.displayValue} </p> } 
            { index !== 0 && teamOpen && <p style={{paddingLeft:'18px',margin:'0', paddingBottom: arr.length-1 === index ? '14px' : '' }}>{fItem.displayValue}</p>}
             
          </div>
        } else {
          return null
        }

      })
    }
  </div>)
  }