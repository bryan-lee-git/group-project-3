import React from 'react';
import PageHeader from "../../components/PageHeader";
import BottomSpacer from "../../components/BottomSpacer";
import { Container } from "react-materialize";

const TandC = () => {
    return (
        <Container className="center-align">
            <PageHeader>TERMS AND CONDITIONS</PageHeader>
            <BottomSpacer/>
        </Container>
    );
}

export default TandC;
