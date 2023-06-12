import React, { Component } from 'react';

import { Card, Divider , Button, Icon} from 'react-native-elements';
import { Text } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
import { View } from 'react-native';
class Contactus extends Component {
    
    render() {
        return (
            <Animatable.View animation='fadeInDown' duration={1000} delay={500}>
            <Card title="Contact Information">

                <Card.Title>
                    Contact Information
                </Card.Title>
                <Card.Divider></Card.Divider>
                <Text>
                    121, Clear Water Bay Road 
                   
                </Text>
                <Text>
                Clear Water Bay, Kowloon
                    
                </Text>
                <Text>
                HONG KONG
                   
                </Text>
                <Text>
                Tel: +852 1234 5678
                   
                </Text>
                <Text>
                Fax: +852 8765 4321
               
                </Text>
                <Text>
                Email:confusion@food.net
                </Text>
                
                <Button title=' Compose Email' buttonStyle={{ backgroundColor: '#7cc' }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.composeMail} />


            </Card>
            </Animatable.View>
        );
    }
    composeMail() {
        MailComposer.composeAsync({
          recipients: ['<th50989@gmail.com>'],
          subject: 'From Confusion',
          body: 'Hello my friends ...'
        });
      }
}


export default Contactus;