import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ClientList extends Component {

    constructor(props) {
        super(props);
        this.state = {clients: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/clients')
            .then(response => response.json())
            .then(data => this.setState({clients: data}));
    }

    async remove(id) {
        await fetch(`/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.clients].filter(i => i.id !== id);
            this.setState({clients: updatedClients});
        });
    }

    render() {
        const {clients} = this.state;

        const clientList = clients.map(client => {
            return <tr key={client.id}>
                <td style={{whiteSpace: 'nowrap'}}>{client.name}</td>
                <td>{client.email}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/clients/" + client.id}>Editar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(client.id)}>Apagar</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/clients/new">Adicionar Cliente</Button>
                    </div>
                    <h3>Clientes</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Nome</th>
                            <th width="30%">E-mail</th>
                            <th width="40%">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ClientList;