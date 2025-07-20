'use client';

// Custom table component based on the MUI table
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Bundle } from '../../types/bundle';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: '400px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '4px',
    },
}));

type Props = {
    columns: string[];
    fields: (keyof Bundle)[];
    data: Bundle[];
}

const GeneralBundlesTable = ({ columns, fields, data }: Props) => {
    return (
        <StyledTableContainer>
            <Table stickyHeader>
                <TableHead sx={{ backgroundColor: 'lightgray' }}>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column} align="left">{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            {fields.map((field) => (
                                <TableCell key={field} align="left">{row[field]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
};

export default GeneralBundlesTable;