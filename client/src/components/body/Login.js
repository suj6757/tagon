import React from 'react';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id : ''
        ,   pw : ''
        ,   resData : []
        }
    }
 
    saveId = () => {
        window.sessionStorage.setItem("ID", this.state.id);
        this.props.callBack(this.state.id);
    }

    componentDidMount = () => {
        console.log(this.state.resData);
        
        this.callApi();
    }

    callApi = async () => {
        await axios({
            method: "get",
            url: "/api/TotalCategory_List",
            responseType: "type"
        }).then(({ data }) => {
            this.setState({
                resData: data.Data
            });
            
            console.log(this.state.resData);
        }).catch(function (error) {
            // 오류발생시 실행
        });
    }

    render() {
        return (
            <>
                <div>ID : <input type='text' name="id" value={this.state.id} onChange={({target : { value }}) => this.setState({ id : value })} /></div>
                <div>PW : <input type='password' name="pw" value={this.state.pw} onChange={({target : { value }}) => this.setState({ pw : value })} /></div>
                <div><button type="button" onClick={this.saveId}>로그인</button></div>
                <div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Category1</TableCell>
                                <TableCell align="center">Category2</TableCell>
                                <TableCell align="center">Category3</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.resData.length ? this.state.resData.map((data, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell align="center">{data.Category1}</TableCell>
                                    <TableCell align="center">{data.Category2}</TableCell>
                                    <TableCell align="center">{data.Category3}</TableCell>
                                </TableRow>
                            );
                        }) : 
                            <TableRow>
                                <TableCell align="center" colSpan="3">데이터 로딩중</TableCell>
                            </TableRow>
                        }
                        </TableBody>
                    </Table>
                </div>
            </>
        );
    }
}

export default Login;