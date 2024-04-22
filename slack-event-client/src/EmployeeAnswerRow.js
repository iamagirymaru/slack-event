import './EmployeeAnswerRow.css';
import moment from 'moment';

function EmployeeAnswerRow(props) {
    return (
        <div className="EmployeeAnswerRow">
            <div className='EmployeeAnswerCell'>
                { props.id }
            </div>
            <div className='EmployeeAnswerCell'>
                { props.name }
            </div>
            <div className='EmployeeAnswerCell'>
                { props.email }
            </div>
            <div className='EmployeeAnswerCell'>
                { props.isGoingCorporate ? 'Да' : 'Нет' }
            </div>
            <div className='EmployeeAnswerCell'>
                { moment(props.createdAt).format('DD-MM-YYYY HH:mm:ss') }
            </div>
        </div>
    );
}

export default EmployeeAnswerRow;