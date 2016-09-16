
import React from 'react';
var FixedDataTable = require('fixed-data-table');
const {Table, Column, Cell, ColumnGroup} = FixedDataTable;
var _ = require('lodash');

import {Grid, Row, Col} from 'react-bootstrap';


class MyImageCell extends React.Component {
    render() {
        const {rowIndex, field, data, ...props} = this.props;
        const link = data[rowIndex][field];
        return (
            <Cell {...props}>
                <img src={link} width="40" height="40" />
            </Cell>
        );
    }
}

class MyTextCell extends React.Component {
    render() {
        const {rowIndex, field, data, ...props} = this.props;
        return (
            <Cell {...props}>
                {data[rowIndex][field]}
            </Cell>
        );
    }
}

class MyLinkCell extends React.Component {
    render() {
        const {rowIndex, field, data, ...props} = this.props;
        const link = data[rowIndex][field];
        return (
            <Cell {...props}>
                <a href={link} target="_blank">{link}</a>
            </Cell>
        );
    }
}

class MyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myTableData: []
        };
    }
    setData(result){
        var data =[];
        for(var i=0; i< result.length ; i++){
            data.push({
                id: result[i].id,
                login: result[i].login,
                avatar_url: result[i].avatar_url,
                repos_url: result[i].repos_url
            });
        }
        this.setState({myTableData: data});
    }
    componentDidMount() {
        var url = 'https://api.github.com/users';
        var data = [];
        this.serverRequest = $.get(url, function (result) {
            this.setData(result)
        }.bind(this));

    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    render() {
        return (
            <Grid>
                <Row>
                    <Col mdOffset={2} xsOffset={2} md={5} xs={5}>
                        <h3>Load Initial Data via AJAX</h3>
                    </Col>
                </Row>
                <Row>
                    <Col mdOffset={2} xsOffset={2} md={5} xs={5}>
                        <Table
                            rowsCount={this.state.myTableData.length}
                            rowHeight={50}
                            headerHeight={50}
                            width={650}
                            height={550}
                            align="center">
                            <Column
                                header={<Cell>ID</Cell>}
                                cell={
                                    <MyTextCell
                                      data={this.state.myTableData}
                                      field="id"
                                    />
                                  }
                                width={100}
                            />
                            <Column
                                header={<Cell>Login</Cell>}
                                cell={
                                    <MyTextCell
                                      data={this.state.myTableData}
                                      field="login"
                                    />
                                  }
                                width={100}
                                />
                            <Column
                                header={<Cell>Repo URL</Cell>}
                                cell={
                                    <MyLinkCell
                                      data={this.state.myTableData}
                                      field="repos_url"
                                    />
                                }
                                width={350}
                            />
                            <Column
                                header={<Cell>Avtar</Cell>}
                                cell={
                                    <MyImageCell
                                      data={this.state.myTableData}
                                      field="avatar_url"
                                    />
                                }
                                width={100}
                            />
                        </Table>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default MyTable;