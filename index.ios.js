var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

var styles = StyleSheet.create({
	imageContainer: {
		flex: 1,
		alignItems: 'stretch'
	},
	backgroundImage: {
		width: width,
		height: height
	},
	textBox : {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: 'white',
		padding: 10,
		width:width-40,
		alignSelf: 'center',
	},
	mainText: {
		color: 'black',
		fontSize: 20
	},
	mainContainer: {
		flex: 4,
		flexDirection: 'column',
		marginTop:100
	},
	leftNavButtonText: {
		fontSize: 16,
		marginLeft:18,
		marginTop:10
	},
	rightNavButtonText: {
		fontSize: 18,
		marginRight:13,
		marginTop:2
	},
	nav: {
		height: 60,
		backgroundColor: '#efefef'
	},
	title: {
		marginTop:4,
		fontSize:16
	},
	button: {
		height:60,
		marginBottom:10,
		backgroundColor: '#efefef',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		fontSize:18
	}
});

import React, { Component } from 'react';
import { Text, Navigator, AppRegistry, TouchableHighlight, Image, StyleSheet, View, Dimensions } from 'react-native';

class MyButton extends React.Component {
	render() {
		return (
			<View>
			<Text>{this.props.label}</Text>
			</View>
			)
	}
}

var MOCKED_QUESTIONS_DATA = [
{question : '당신에게 가장 기억에 남는 사람은 누구인가요?'},
{question : '당신이 가장 좋아하는 동물은 무엇인가요?'},
{question : '당신에게 가장 좋았던 기억은 무엇인가요?'},
{question : '당신이 가장 좋아하는 음식은 무엇인가요?'},
{question : '당신에게 가장 기억에 남는 여행지는 어디인가요?'},
];

var NavigationBarRouteMapper = {
	Title(route, navigator, index, navState) {
			// return <Text style={ styles.title }>MY APP TITLE</Text>
		},
		LeftButton(route, navigator, index, navState) {
			if(index > 0) {
				return (
					<TouchableHighlight
					underlayColor="transparent"
					onPress={() => { if (index > 0) { navigator.pop() } }}>
					<Text style={ styles.leftNavButtonText }>뒤로</Text>
					</TouchableHighlight>
					)}
				else { return null }
			},
		RightButton(route, navigator, index, navState) {
			console.log("right 버튼 클릭")
			if (route.onPress) return ( <TouchableHighlight
				onPress={ () => route.onPress() }>
				<Text style={ styles.rightNavButtonText }>
				{ route.rightText || 'Right Button' }
				</Text>
				</TouchableHighlight> )
		}
};

//답변 작성 클래스
class AnswerEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
				question: MOCKED_QUESTIONS_DATA[0].question,
				position : 0
			};
		}

		render() {
			return (
				<View style ={styles.imageContainer}>
				<Image
				style={styles.backgroundImage}
				source={require('./img/main_bg_img.png')}>

				<View
				style={{marginLeft: 35, marginTop: 120}}>
				<Image
				style={{overflow: 'visible',  width: 40, height: 40}}
				source={require('./img/small_fox.png')}/>
				</View >

				<TouchableHighlight onPress={this._onPressQuestion} style={styles.textBox}>
				<Text style={{backgroundColor: 'white'}}>변신!</Text>
				</TouchableHighlight>


				<TouchableHighlight onPress={this._onPressButton} style={{alignSelf:'center', marginTop:150}}>
				<Text style={{color:'white',textDecorationLine: 'underline', }}>다른 질문 보여줘!</Text>
				</TouchableHighlight>

				</Image>
				</View>
				);
		}
	}

	//질문 클래스
	class Question extends Component {
		constructor(props) {
			super(props);
			this.state = {
				// movies: null
				question: MOCKED_QUESTIONS_DATA[0].question,
				position : 0
			};
			this.gotoNext = this.gotoNext.bind(this)
			this._onPressButton = this._onPressButton.bind(this)
		}

		render() {
			var movie = MOCKED_QUESTIONS_DATA[this.position];
			return (
				<View style ={styles.imageContainer}>
				<Image
				style={styles.backgroundImage}
				source={require('./img/main_bg_img.png')}>

				<View
				style={{marginLeft: 35, marginTop: 120}}>
				<Image
				style={{overflow: 'visible',  width: 40, height: 40}}
				source={require('./img/small_fox.png')}/>
				</View >

				<TouchableHighlight onPress={this.gotoNext} style={styles.textBox}>
				<Text style={{backgroundColor: 'white'}}>{this.state.question}</Text>
				</TouchableHighlight>


				<TouchableHighlight onPress={this._onPressButton} style={{alignSelf:'center', marginTop:150}}>
				<Text style={{color:'white',textDecorationLine: 'underline', }}>다른 질문 보여줘!</Text>
				</TouchableHighlight>

				</Image>
				</View>
				);
		}

		//질문 박스 클릭 이벤트
		_onPressQuestion() {
			this.setState({
				question: this.state.question,
				position : this.state.position,
			});
			console.log("박스 클릭함");
		}

		gotoNext() {
			this.props.navigator.push({
				component: AnswerEdit,
				passProps: {
					id: 'MY ID',
				},
				onPress: this.onPress,
				rightText: 'ALERT!'
			})
		}

		//다른 질문 보여줘 버튼 클릭 이벤트
		_onPressButton() {
			pos = this.state.position;
			if(pos == MOCKED_QUESTIONS_DATA.length-1) {
				pos = 0;
			} else {
				pos++;
			}

			this.setState({
				question: MOCKED_QUESTIONS_DATA[pos].question,
				position : pos
			});
		}
	}


	//기본 클래스
	export default class AwesomeProject extends Component {
		constructor(props) {
			super(props);
			this.state = {
				question: MOCKED_QUESTIONS_DATA[0].question,
				position : 0,
				isWriting : false
			};
		}

		render() {
			return (
				<Navigator
				style={{flex:1}}
				initialRoute={{name: 'Question', component: Question}}
				renderScene={ this.renderScene }
				navigationBar={
					<Navigator.NavigationBar
					style={ styles.nav }
					routeMapper={NavigationBarRouteMapper} />}
					/>
					)
		}
		renderScene(route, navigator) {
			return <route.component {...route.passProps} navigator={navigator} />}

		}



		AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);