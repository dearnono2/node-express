import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Main from './common/Main';
import List from './community/List';
import Create from './community/Create';
import Detail from './community/Detail';
import Edit from './community/Edit';
import GlobalStyle from './GlobalStyle';
import Join from './user/Join';
import Login from './user/Login';

function App() {

	return (
		<>
			<GlobalStyle />
			<Header />

			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/create' element={<Create />} />
				{/* 라우터에 params 설정 */}
				<Route path='/detail/:num' element={<Detail />} />
				<Route path='/edit/:num' element={<Edit />} />
				<Route path='/join' element={<Join />} />
				<Route path='/login' element={<Login />} />

			</Routes>
		</>
	);
}

export default App;
