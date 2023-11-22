import { useEffect, useState } from 'react';

function App({ getAPI, postAPI, deleteAPI }) {
  const [lists, setLists] = useState();
  const [tasks, setTasks] = useState();
  const [discs, setDiscs] = useState();
  const [newT, setNewT] = useState('');
  const [newD, setNewD] = useState('');

  useEffect(() => {
    getAPI(1).then(setLists);
    getAPI(2).then(setTasks);
  }, []);
  // console.log('tasks : ', tasks);

  async function addTask(e) {
    e.preventDefault();
    try {
      const obj = { title: newT, description: newD };
      const back = await postAPI(2, obj);
      console.log('back to App: ', back);
      const T = back[0][title];
      const D = back[0][description];
      console.log('T & D: ', T, D);
      setTasks({ ...tasks, T });
      setTasks({ ...discs, D });
      setNewT('');
      setNewD('');
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div>
      <h1>メモ帳</h1>
      <main>
        <form onSubmit={(e) => addTask(e)}>
          <input
            value={newT}
            placeholder="タイトル :"
            onChange={(e) => setNewT(e.target.value)}
          />
          <input
            value={newD}
            placeholder="内容 :"
            onChange={(e) => setNewD(e.target.value)}
          />
          <button>追加</button>
        </form>
        {tasks &&
          tasks.map((task) => {
            async function deleteTask() {
              try {
                deleteAPI(2, task.id);
                setTasks((tasks) => tasks.filter((e) => e !== task));
              } catch (error) {
                alert(error.message);
              }
            }
            function setTask(value) {
              setTasks((tasks) => tasks.map((e) => (e === task ? value : e)));
            }
            function setD(value) {
              setDiscs((discs) => discs.map((e) => (e === task ? value : e)));
            }
            function setTitle(title) {
              setTask({ ...task, title });
            }
            function setDis(dis) {
              setD({ ...task, dis });
            }
            return (
              <div key={task.id}>
                <p>No.{task.id}</p>
                <input
                  value={task.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  value={task.description}
                  onChange={(e) => setDis(e.target.value)}
                />
                <button onClick={() => deleteTask()}>削除</button>
              </div>
            );
          })}
      </main>
      <h1>カリキュラム</h1>
      <div id="frame">
        {lists &&
          lists.map((list) => {
            return (
              <div key={list.id}>
                week : {list.week}{' '}
                <a id={list.type} href={list.url} target="_blank">
                  <strong>{list.title}</strong>
                </a>
                {list.goal && <p> {list.goal}</p>}
                {list.memo && <p> {list.memo}</p>}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
