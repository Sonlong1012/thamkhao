import React, { Component } from 'react';

import { Card, Divider , Button, Icon} from 'react-native-elements';
import { Text } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
import { View } from 'react-native';
import { getDatabase, ref, child, onValue } from 'firebase/database';
class Contactus extends Component {
    constructor(props) {
        super(props);
        this.state = {
          number: '',
          street: '',
          district: '',
          city: '',
          phone: '',
          fax: '',
          email: ''
        }
      }
    render() {
        return (
            <Animatable.View animation='fadeInDown' duration={1000} delay={500}>
            <Card title="Contact Information">

                <Card.Title>
                    Contact Information
                </Card.Title>
                <Card.Divider></Card.Divider>
                <Text>
                {this.state.number}, {this.state.street}
                   
                </Text>
                <Text>
                {this.state.district}
                    
                </Text>
                <Text>
                {this.state.city}
                   
                </Text>
                <Text>
                {this.state.phone}
                   
                </Text>
                <Text>
                {this.state.fax}
               
                </Text>
                <Text>
                {this.state.email}
                </Text>
                
                <Button title=' Compose Email' buttonStyle={{ backgroundColor: '#7cc' }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.composeMail} />


            </Card>
            </Animatable.View>
        );
    }
    componentDidMount() {
        const dbRef = ref(getDatabase());
        onValue(child(dbRef, 'contact/'), (snapshot) => {
          const value = snapshot.val();
          this.setState({
            number: value.address.number,
            street: value.address.street,
            district: value.address.district,
            city: value.address.city,
            phone: value.phone,
            fax: value.fax,
            email: value.email
          });
        });
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