import React, { Component } from 'react';

import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1,
  Grid,
  Item
} from "native-base";

import ReactNative from 'react-native';
const {  
	View,
	StyleSheet,
	TouchableOpacity,
	Image
} = ReactNative;

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../modules/event';

/**
 * DetailEvent component
 */
class DetailEvent extends Component {

	static navigationOptions = ({ navigation }) => ({
	    header: (
	      <Header style={{backgroundColor: 'black'}}>
	        <Left style={{flex: 1}}>
	          <Button transparent onPress={() => navigation.goBack()}>
	            <Icon name="arrow-back" />
	          </Button>
	        </Left>
	        <Body style={{alignItems: 'center'}}>
	          <Title>{navigation.state.params.detailTitle}</Title>
	          <Text style={{color: 'gray', fontSize: 13}}>{navigation.state.params.detailTime}</Text>
	        </Body>
	        <Right />
	      </Header>
	    )
  	});

  	constructor(props) {
  		super(props);
  	}

	/**
    * handel on Press Dispense btn
    * @return {void}
    */
	onPressDispense() {
		//alert('');
	}

  	/**
   	 * Render DetailEvent
   	 * @return {jsxresult} result in jsx format
   	*/
	render() {

		const {detailTitle, detailTime, detailLocation, detailImage} = this.props.navigation.state.params;
		const {guests} = this.props;
		const listData = guests;

		return (
			<Container style={{backgroundColor:'white'}}>
	        	<Grid>
		        	<View style={{flex: 1, flexDirection: 'column'}}>
		        		<View style={{flex:0.4}}>
		        			<Image resizeMode="stretch" style={{flex:1, height: undefined, width: undefined }} source={{uri: detailImage}}>
								<View style={{flex:1, justifyContent: 'center', position: 'absolute', bottom: 0, padding: 10, width: '100%', backgroundColor: 'rgba(0,0,0,0.7)', opacity: 0.2}}>
									<Text style={{fontSize: 20, color: 'white'}}>{detailTitle}</Text>
									<Text style={{fontSize: 13, color: 'white', marginTop:10}}>{`${detailTime} - ${detailLocation}`}</Text>
								</View>
								<View style={{flex:1, justifyContent: 'center', position: 'absolute', bottom: 0, padding: 10, width: '100%'}}>
									<Text style={{fontSize: 20, color: 'white'}}>{detailTitle}</Text>
									<Text style={{fontSize: 13, color: 'white', marginTop:10}}>{`${detailTime} - ${detailLocation}`}</Text>
								</View>
							</Image>
		        		</View>
		        		<View style={{marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
		        			<View style={{flex: 0.7, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
			        			<Text style={{fontSize: 20, color: 'black'}}>
			        				Total Attendees:
			        			</Text>
			        			<Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}> {guests.length}</Text>
			        		</View>
		        			<View style={{flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5}}>
				        		<Button bordered dark onPress={()=>{
				        			this.props.navigation.navigate("CheckIn", { 
	            						detailTitle: detailTitle
	            					});
				        		}}>
				        			<Text>Check In</Text>
				        			<Icon name='md-checkmark-circle-outline' />
				        		</Button>
				        	</View>
		        		</View>
		        		<View style={{flex:0.6}}>
		        			{
			        			listData.map((item, index)=>{
			        				return(
						        		<View style={{height: 70, padding:20}} key={index}>
								        	<View style={{flex: 1, flexDirection: 'row'}}>
								        		<View style={{flex:0.2, justifyContent: 'center'}}>
								        			<Icon name='md-checkmark-circle-outline' style={{fontSize: 60}}/>
								        		</View>
								        		<View style={{flex:0.6}}>
								        			<Text>{`${item['last name']} ${item['first name']}`}</Text>
								        			<Text style={{color:'gray', fontSize:13, marginTop:5}}>{item.note}</Text>
								        		</View>
								        		<View style={{flex:0.2, alignItems: 'flex-end', justifyContent: 'center'}}>
								        			<Icon name='ios-trash' style={{fontSize: 30}} onPress={()=>{alert('');}} />
								        		</View>
								        	</View>
								        </View>
								    );
							    })
					    	}
		        		</View>
		        		<View style={{height: 80, alignItems: 'flex-end', paddingRight: 20}}>
		        			<Icon name='ios-add-circle-outline' style={{fontSize: 60}} onPress={()=>{alert('');}} />
		        		</View>
		        	</View>
		        </Grid>
		    </Container>
		);
	}
}

export default connect(
  (state) => ({
    guests: state.event.guests
  }),
  (dispatch) => ({
    eventActions: bindActionCreators(eventActions, dispatch)
  })
)(DetailEvent);