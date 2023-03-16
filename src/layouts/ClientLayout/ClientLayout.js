import React, {useEffect} from "react";
import { Container, Icon, Button } from "semantic-ui-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {useTable} from "../../hooks";
import "./ClientLayout.scss";

export function ClientLayout(props) {
    const { children } = props;
    const {isExistTable} =useTable();
    const {tableNumber} =useParams();
    const Navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const exist = await isExistTable(tableNumber);
            if (!exist) closeTable();               
            }) ();
    }, [tableNumber]);

    const closeTable = () => {
        Navigate("/")
    };

    const goToCart = () => {
      Navigate(`/client/${tableNumber}/cart`)
    }

    const goToOrders = () => {
        Navigate(`/client/${tableNumber}/orders`)
      }

      return (        
        <div className="client-layout-bg">
        <Container className="client-layout">
            <div className="client-layout__header">
                <Link to={`/client/${tableNumber}`}>
                    <h1>iCard</h1>
                </Link>
                <span>Mesa {tableNumber}</span>
                <div>
                    <Button icon onClick={(goToCart)}>
                        <Icon name="shop"></Icon>
                    </Button>
                    <Button icon onClick={(goToOrders)}>
                        <Icon name="list"></Icon>
                    </Button>
                    <Button icon onClick={(closeTable)}>
                        <Icon name="sign-out"></Icon>
                    </Button>
                </div>
            </div>
         <div className="client-layout__content">{children}</div>
        </Container>
        </div>
    );
}