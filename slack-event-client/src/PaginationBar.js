import './PaginationBar.css';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PaginationBar(props) {
    return (
        <div className="PaginationBar">
            <Stack>
                <Pagination count={props.maxPage} color="primary" size="large" onChange={ props.onChange } />
            </Stack>
        </div>
    );
}

export default PaginationBar;