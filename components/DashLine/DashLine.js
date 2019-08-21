/**
 * this component is from obipawan's react-native-dash
 * https://github.com/obipawan/react-native-dash
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
export default class Dash extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, initialRender: false };
        this.measure = this.measure.bind(this);
    }
    measure({ nativeEvent: { layout: { width = 0, height = 0 } = {} } = {} }) {
        this.setState({ width, height, initialRender: true });
    }
    render() {
        const props = this.props;
        const { width, height } = this.state;
        const isRow = isStyleRow(props.style);
        const length = isRow ? width : height;
        const n = Math.ceil(length / (props.dashGap + props.dashLength));
        const calculatedDashStyles = getDashStyle(props);
        let dash = [];
        //必须+2,不然尾部少了，不知道咋回事
        for (let i = 0; i < n + 2; i++) {
            dash.push(<View key={i} style={[
                calculatedDashStyles,
                props.dashStyle,
            ]}/>);
        }
        return (this.state.initialRender ?
            <View onLayout={props.onLayout} style={[isRow ? styles.dashRow : styles.dashColumn, props.style,]}>
                    {dash}
                </View>
            :
                <View style={this.props.style} onLayout={this.measure}/>);
    }
}
Dash.propTypes = {
    style: ViewPropTypes.style,
    dashGap: PropTypes.number.isRequired,
    dashLength: PropTypes.number.isRequired,
    dashThickness: PropTypes.number.isRequired,
    dashColor: PropTypes.string,
    dashStyle: ViewPropTypes.style,
};
Dash.defaultProps = {
    dashGap: 2,
    dashLength: 4,
    dashThickness: 2,
    dashColor: '#e9eef5',
};
const isStyleRow = style => {
    const flatStyle = StyleSheet.flatten(style || {});
    return flatStyle.flexDirection !== 'column';
};
const getDashStyleId = ({ dashGap, dashLength, dashThickness, dashColor }, isRow) => `${dashGap}-${dashLength}-${dashThickness}-${dashColor}-${isRow ? 'row' : 'column'}`;
const createDashStyleSheet = ({ dashGap, dashLength, dashThickness, dashColor }, isRow) => {
    const idStyle = StyleSheet.create({
        style: {
            width: isRow ? dashLength : dashThickness,
            height: isRow ? dashThickness : dashLength,
            marginRight: isRow ? dashGap : 0,
            marginBottom: isRow ? 0 : dashGap,
            backgroundColor: dashColor,
        },
    });
    return idStyle.style;
};
let stylesStore = {};
const getDashStyle = props => {
    const isRow = isStyleRow(props.style);
    const id = getDashStyleId(props, isRow);
    if (!stylesStore[id]) {
        stylesStore = Object.assign({}, stylesStore, { [id]: createDashStyleSheet(props, isRow) });
    }
    return stylesStore[id];
};
const styles = StyleSheet.create({
    dashRow: {
        flexDirection: 'row',
        overflow: 'hidden'
    },
    dashColumn: {
        flexDirection: 'column',
    },
});
//# sourceMappingURL=DashLine.js.map