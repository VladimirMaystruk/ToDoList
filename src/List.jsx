import React, { useState } from "react";
import style from "./List.module.css";

function List() {
  const [tasksArray, setTasksArray] = useState([]);

  const [showAdd, setShowAdd] = useState(false);

  const [showErr, setShowErr] = useState(false);

  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const [valueEdit, setValueEdit] = useState({
    title: "",
    description: "",
  });

  const addTask = () => {
    if (values.title === "" || values.description === "") {
      setShowErr(true);
    } else {
      if (tasksArray.length === 0) {
        setTasksArray((prevState) => [
          ...prevState,
          {
            id: 1,
            title: values.title,
            description: values.description,
            showDelete: false,
            showPerformance: false,
            showDescription: false,
            showEdit: false,
            showErr: false,
          },
        ]);
        setShowAdd(false);
        setShowErr(false);
      } else {
        setTasksArray((prevState) => [
          ...prevState,
          {
            id: tasksArray[tasksArray.length - 1]?.id + 1,
            title: values.title,
            description: values.description,
            showDelete: false,
            showPerformance: false,
            showDescription: false,
            showEdit: false,
            showErr: false,
          },
        ]);
        setShowAdd(false);
        setShowErr(false);
      }
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setShowErr(false);

      setValues((prevState) => {
        return { ...prevState, title: value };
      });
    }

    if (name === "description") {
      setShowErr(false);
      setValues((prevState) => {
        return { ...prevState, description: value };
      });
    }
  };

  const tasksArrayMap = tasksArray.map((task) => {
    const showDelete = (e) => {
      let newArr = [];

      tasksArray.forEach((item) => {
        if (item?.id === task?.id) {
          newArr = [...newArr, { ...item, showDelete: true, showEdit: false }];
        } else {
          newArr = [...newArr, { ...item, showDelete: false }];
        }
      });

      setTasksArray(newArr);
    };

    const cancelShowDelete = (e) => {
      let newArr = [];

      tasksArray.forEach((item) => {
        if (item?.id === task?.id) {
          newArr = [...newArr, { ...item, showDelete: false }];
        } else {
          newArr = [...newArr, item];
        }
      });

      setTasksArray(newArr);
    };

    const performance = () => {
      let newArr = [];

      tasksArray.forEach((item) => {
        if (item?.id === task?.id) {
          newArr = [
            ...newArr,
            { ...item, showPerformance: !item?.showPerformance },
          ];
        } else {
          newArr = [...newArr, item];
        }
      });

      setTasksArray(newArr);
    };

    const showDescription = () => {
      let newArr = [];

      tasksArray.forEach((item) => {
        if (item?.id === task?.id) {
          newArr = [
            ...newArr,
            { ...item, showDescription: !item?.showDescription },
          ];
        } else {
          newArr = [...newArr, item];
        }
      });

      setTasksArray(newArr);
    };

    const edit = () => {
      let newArr = [];

      tasksArray.forEach((item) => {
        if (item?.id === task?.id) {
          newArr = [
            ...newArr,
            { ...item, showEdit: true, showErr: false, showDelete: false },
          ];

          setValueEdit((prevState) => {
            return { ...prevState, title: item?.title };
          });

          setValueEdit((prevState) => {
            return { ...prevState, description: item?.description };
          });
        } else {
          newArr = [...newArr, { ...item, showEdit: false }];
        }
      });

      setTasksArray(newArr);
    };

    const cancelEdit = () => {
      let newArr = [];

      tasksArray.forEach((item) => {
        if (item?.id === task?.id) {
          newArr = [...newArr, { ...item, showEdit: false }];
        } else {
          newArr = [...newArr, item];
        }
      });

      setTasksArray(newArr);
    };

    const okEdit = () => {
      if (valueEdit.title === "" || valueEdit.description === "") {
        let newArr = [];

        tasksArray.forEach((item) => {
          if (item?.id === task?.id) {
            newArr = [...newArr, { ...item, showErr: true }];
          } else {
            newArr = [...newArr, item];
          }
        });

        setTasksArray(newArr);
      } else {
        let newArrTitle = [];

        tasksArray.forEach((item) => {
          if (item?.id === task?.id) {
            newArrTitle = [
              ...newArrTitle,
              {
                ...item,
                title: valueEdit.title,
                description: valueEdit.description,
                showEdit: false,
              },
            ];
          } else {
            newArrTitle = [...newArrTitle, item];
          }
        });

        setTasksArray(newArrTitle);
      }
    };

    const onChangeEdit = (e) => {
      const { name, value } = e.target;

      if (name === "titleEdit") {
        let newArr = [];

        tasksArray.forEach((item) => {
          if (item?.id === task?.id) {
            newArr = [...newArr, { ...item, showErr: false }];
          } else {
            newArr = [...newArr, item];
          }
        });

        setTasksArray(newArr);

        setValueEdit((prevState) => {
          return { ...prevState, title: value };
        });
      }

      if (name === "descriptionEdit") {
        let newArr = [];

        tasksArray.forEach((item) => {
          if (item?.id === task?.id) {
            newArr = [...newArr, { ...item, showErr: false }];
          } else {
            newArr = [...newArr, item];
          }
        });

        setTasksArray(newArr);
        setValueEdit((prevState) => {
          return { ...prevState, description: value };
        });
      }
    };

    return (
      <div className={style.div} key={task?.id}>
        <fieldset className={task?.showPerformance && style.fieldset}>
          <legend className={task?.showPerformance && style.text}>
            {task?.id}
          </legend>
          <div>
            <label className={task?.showPerformance && style.text}>
              {task?.title}
            </label>
            <button
              data-title={
                (task?.showPerformance && "???????????????? ???????????? '???? ??????????????????'") ||
                "???????????????? ???????????? '??????????????????'"
              }
              className={style.buttonIcon}
              onClick={performance}
            >
              {(task?.showPerformance && (
                <img
                  src="/images/dontperformance.png"
                  alt=""
                  style={{ width: 15, height: 15 }}
                />
              )) || (
                <img
                  src="/images/performance.png"
                  alt=""
                  style={{ width: 15, height: 15 }}
                />
              )}
            </button>
            <button
              data-title="?????????????????????????? ????????????"
              className={style.buttonIcon}
              onClick={edit}
            >
              <img
                src="/images/edit.png"
                alt=""
                style={{ width: 15, height: 15 }}
              />
            </button>
            <button
              data-title="?????????????? ????????????"
              className={style.buttonIcon}
              onClick={showDelete}
            >
              <img
                src="/images/delete.png"
                alt=""
                style={{ width: 15, height: 15 }}
              />
            </button>
            <button
              data-title={
                (task?.showDescription && "???????????? ????????????????") ||
                "?????????????? ????????????????"
              }
              className={style.buttonIcon}
              onClick={showDescription}
            >
              {(task?.showDescription && (
                <img
                  src="/images/DescriptionUp.png"
                  alt=""
                  style={{ width: 15, height: 15 }}
                />
              )) || (
                <img
                  src="/images/Descriptionduwn.jpg"
                  alt=""
                  style={{ width: 15, height: 15 }}
                />
              )}
            </button>
          </div>
          {task?.showDescription && (
            <div className={task?.showPerformance && style.text}>
              <fieldset>
                <legend>????????????????</legend>
                {task?.description}
              </fieldset>
            </div>
          )}
          {task?.showEdit && (
            <div>
              <fieldset>
                <legend>????????????????????????????</legend>
                <fieldset>
                  <legend>??????????????????</legend>
                  <input
                    value={valueEdit?.title}
                    name="titleEdit"
                    onChange={onChangeEdit}
                  />
                  {task?.showErr && (
                    <div className={style.err}>???? ?????? ???????? ??????????????????</div>
                  )}
                </fieldset>
                <fieldset>
                  <legend>????????????????</legend>
                  <input
                    value={valueEdit?.description}
                    name="descriptionEdit"
                    onChange={onChangeEdit}
                  />
                  {task?.showErr && (
                    <div className={style.err}>???? ?????? ???????? ??????????????????</div>
                  )}
                </fieldset>
                <button className={style.button} onClick={okEdit}>
                  ??????????????????????????
                </button>
                <button className={style.button} onClick={cancelEdit}>
                  ???????????????? ????????????????????????????
                </button>
              </fieldset>
            </div>
          )}
          {task.showDelete && (
            <div>
              <label>???? ???????????? ?????????????? ???????????? ?????????????</label>
              <div>
                <button
                  className={style.button}
                  onClick={() =>
                    setTasksArray((prevState) =>
                      prevState.filter((item) => item?.id !== task?.id)
                    )
                  }
                >
                  ????
                </button>
                <button className={style.button} onClick={cancelShowDelete}>
                  ??????
                </button>
              </div>
            </div>
          )}
        </fieldset>
      </div>
    );
  });

  const showTasksAdd = () => {
    setShowAdd(true);
    setShowErr(false);

    setValues((prevState) => {
      return { ...prevState, title: "" };
    });

    setValues((prevState) => {
      return { ...prevState, description: "" };
    });
  };

  const cancelAdd = () => {
    setShowAdd(false);
  };

  return (
    <div style={{ maxWidth: 400, width: "100%", margin: "0 auto" }}>
      {showAdd || (
        <button
          data-title="???????????????? ????????????"
          className={style.buttonIcon}
          onClick={showTasksAdd}
        >
          <img
            src="/images/Plas.png"
            alt=""
            style={{ width: 30, height: 30 }}
          />
        </button>
      )}

      {showAdd && (
        <div>
          <fieldset>
            <fieldset>
              <legend>??????????????????</legend>
              <input name="title" onChange={onChange} />
              {showErr && (
                <div className={style.err}>???? ?????? ???????? ??????????????????</div>
              )}
            </fieldset>
            <fieldset>
              <legend>????????????????</legend>
              <input name="description" onChange={onChange} />
              {showErr && (
                <div className={style.err}>???? ?????? ???????? ??????????????????</div>
              )}
            </fieldset>
            <button className={style.button} onClick={addTask}>
              ????????????????
            </button>
            <button className={style.button} onClick={cancelAdd}>
              ???????????????? ????????????????????
            </button>
          </fieldset>
        </div>
      )}
      <div className={style.div}>{tasksArrayMap}</div>
    </div>
  );
}

export default List;
