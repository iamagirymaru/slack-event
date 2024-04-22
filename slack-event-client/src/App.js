import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import EmployeeAnswerRow from './EmployeeAnswerRow';
import PaginationBar from './PaginationBar';

function App() {
	const [employeeAnswersCount, setEmployeeAnswersCount] = useState(null);
	const [employeeAnswers, setEmployeeAnswers] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const limit = 30;

	const handleChange = (event, value) => {
		setCurrentPage(value);
	};

	const axiosConnection = axios.create({
		baseURL: 'http://localhost:8080',
		headers: {'Content-Type': 'application/json'}
	});

	/** Получение ответов с пагинацией */
	const getEmployeeAnswersPagination = async (params) => {
		let res = null;

		try {
			res = await axiosConnection.get(`/employee-answer/get-employee-answers/${params.limit}/${params.page}`);
		} catch (e) {
			console.log(e)
		}

		return res.data;
	}

	/** Получение количества всех ответов */
	const getEmployeeAnswersCount = async () => {
		let res = null;

		try {
			res = await axiosConnection.get('/employee-answer/get-employee-answers-count');
		} catch (e) {
			console.log(e)
		}

		return res.data;
	}

	useEffect(() => {
		const saveCount = async () => {
			const countInfo = await getEmployeeAnswersCount();
			setEmployeeAnswersCount(countInfo);
		};
	  
		saveCount();
	}, []);

	useEffect(() => {
		const saveEmployeeAnswersInfo = async () => {
			const employeeAnswersInfo = await getEmployeeAnswersPagination({ limit: limit, page: currentPage });
			setEmployeeAnswers(employeeAnswersInfo);
		};
	  
		saveEmployeeAnswersInfo();
	}, [currentPage]);

	return (
		<div className="App">
			<header>
				Информация об ответах сотрудников о присутствии на корпоративе
			</header>
			<div className="EmployeeAnswerRow">
				<div className='EmployeeAnswerCell'>
					{ 'ID' }
				</div>
				<div className='EmployeeAnswerCell'>
					{ 'Имя' }
				</div>
				<div className='EmployeeAnswerCell'>
					{ 'Email' }
				</div>
				<div className='EmployeeAnswerCell'>
					{ 'Ответ' }
				</div>
				<div className='EmployeeAnswerCell'>
					{ 'Время ответа' }
				</div>
        	</div>
			{employeeAnswers?.map(employeeAnswer => {
				return <EmployeeAnswerRow
					id = { employeeAnswer.id }
					name = { employeeAnswer.name }
					email = { employeeAnswer.email }
					isGoingCorporate = { employeeAnswer.isGoingCorporate }
					createdAt = { employeeAnswer.createdAt } />;
			})}
			<PaginationBar
				onChange = { handleChange }
				maxPage = { Math.ceil(employeeAnswersCount?.employeeAnswersCount / limit) }/>
		</div>
	);
}

export default App;
