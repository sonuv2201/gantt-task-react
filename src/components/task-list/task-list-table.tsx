import React, { useMemo } from "react";
import styles from "./task-list-table.module.css";
import { Task } from "../../types/public-types";
import { TeamType } from "../../types/public-types";
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
  onTableClick: (task: Task) => void;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  onExpanderClick,
  onTableClick,
}) => {
    const toLocaleDateString = useMemo(
      () => toLocaleDateStringFactory(locale),
      [locale]
    );

    const handleTableClick = (t:any) =>{
      onExpanderClick(t);
    }

    return (
      <div
        className={`${styles.taskListWrapper} gantTableWrapper`}
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
              className={`${styles.taskListTableRow} gantTableRow`}
              style={{ height: rowHeight }}
              key={`${t.id}row`}
              onClick={() => handleTableClick(t)}
            >
              <div
                className={`${styles.taskListCell} gantTableCell`}
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
                
                title={`${t.name}`}
                onClick={()=>onTableClick(t)}
              >
                <div className={`${styles.taskListNameWrapper} taskListNameWrapper`}>
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
                className={`${styles.taskListCell} taskListCell`}
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
              >
                &nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
              </div>


              <div
                className={`${styles.taskListCell} taskListCell`}
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                  position: 'relative'
                }}
              >
                <DisplayExtraFiled t={t} rowWidth={rowWidth} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };



const DisplayExtraFiled = ({ t, rowWidth }: any) => {
  let [teamOpen, setTeamOpen] = React.useState(false)

  const listRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    document.addEventListener('click', clickHandle)
  }, [])

  const clickHandle = (event: any) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setTeamOpen(false);
    }
  }

  return (<div className={`childList ${teamOpen ? 'active' : ''} tableTeamName`} style={{
    minWidth: rowWidth,
    maxWidth: rowWidth,
  }} ref={listRef}>
    {
      t?.team?.map((fItem: TeamType, index: number, arr: any) => {
        return <span key={index}>
          {fItem.name}{arr.length - 1 !== index && ', '}
        </span>
      })
    }
  </div>)
}