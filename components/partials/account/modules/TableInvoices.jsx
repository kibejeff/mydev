import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserInvouces } from '~/features/products/productSlice';
import moment from 'moment';

export default function TableInvoices() {
    const {transactionInvoices} = useSelector(state => state.products)
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserInvouces(user?.id))
    }, [])

    const tableColumn = [
        {
            title: 'Order No.',
            dataIndex: 'order',
            rowKey: 'order',
            key: 'order',
            render: (text) => (
                <a>
                    {text}
                </a>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'checkout',
            key: 'product',
            width: '200px',
            render: (text) => (
                <span>{text?.product?.title}</span>
            )
        },
        {
            title: 'Date',
            rowKey: 'date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => (
                <span>{moment(text).format('MMMM Do YYYY')}</span>
            )
        },
        {
            title: 'Amount',
            rowKey: 'amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => (
                <span className="text-right">KES {text}</span>
            ),
        },
        {
            title: 'Transaction ID',
            key: 'trans_id',
            dataIndex: 'trans_id',
            rowKey: 'trans_id',
            render: (text) => (
                <span className="text-right">{text}</span>
            ),
        },
    ];
    return (
        <Table
            columns={tableColumn}
            dataSource={transactionInvoices}
            rowKey={record => record.id}
        />
    );
}

