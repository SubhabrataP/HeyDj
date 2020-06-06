import React, { Component } from "react";
import { Card } from '@uifabric/react-cards';
import {
  Stack,
  Text,
} from 'office-ui-fabric-react';


export default class CardTemplate extends Component {

    alertClicked = () => {
        alert('Clicked');
    };

    render() {
        return (
            <React.Fragment>
                <Stack horizontal>
                    <Card
                        aria-label="Clickable vertical card with image bleeding at the top of the card"
                        onClick={this.alertClicked}
                        // tokens={cardTokens}
                    >
                        <Card.Section
                            fill
                            verticalAlign="end"
                            // styles={backgroundImageCardSectionStyles}
                            // tokens={backgroundImageCardSectionTokens}
                        >
                            <Text variant="large">
                                NOVEMBER
                            </Text>
                            <Text variant="superLarge">
                                26
                            </Text>
                        </Card.Section>
                    </Card>
                </Stack>
            </React.Fragment>
        )
    }
}