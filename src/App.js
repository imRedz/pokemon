import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React from 'react';
import Table from "./Table"
import style from "./App.module.scss"

export default function App() {

  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [changedItems, setChangedItems] = React.useState([]);
  const [isModalOpened, setIsModalOpened] = React.useState(null);

  function onModalSetClick() {
    setIsModalOpened(!isModalOpened)
  }

  function onModalOpen(propsItems) {
    setIsModalOpened(true)

    let newItems = []

    propsItems.forEach(element => {
      newItems = [...newItems, items.find(item => item.name === element)]
    });
    return setChangedItems(newItems)
  }
  React.useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Table
              data={items}
              onSetModal={onModalOpen}
            />
            {isModalOpened ?
              <div
                className={style.modal_outer}
              >
                <div className={style.exit} onClick={onModalSetClick} />
                <div className={style.modal}>
                  <Table
                    noSelection={true}
                    data={changedItems}
                  />
                </div>
              </div>
              :
              ""
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// сделай таблицу с пагинацией используя матириал(можешь выводить имя там,что угодно)

// в таблице должен быть функционал
// - выбора элементов списка таблицы чекбоксом
// - пагинация которая будет синхронизироваться с урлой (т.е stire.name?page=X)

// кнопки контролы
// - кнопка показать выбранные элементы
//   - по клику на кнопку открыть модалку с таблицей(ты должен перееиспользовать таблицу)
// - в таблице на модалке должен быть отключен функционал выбора элементов

// ———————
// для хранения состояния выбранных элементов редакс стор юзать нельзя,ебись с хуками и контекстом