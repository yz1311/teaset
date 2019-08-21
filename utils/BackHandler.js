import { BackHandler } from 'react-native';
//反向继承
const decorator = WrappedComponent => class extends WrappedComponent {
    constructor(props) {
        super(props);
        this.onBackPressed = () => {
            if (this.onBack) {
                //必须要有返回值，否则默认事件继续向上传递
                return this.onBack();
            }
            else if (this._onBack) {
                //必须要有返回值，否则默认事件继续向上传递
                return this._onBack();
            }
            //默认返回上一级
            else {
                if (this.props.navigation) {
                    this.props.navigation.goBack();
                    return true;
                }
                else {
                    console.warn('YZBackHanddler 组件,navigation为空');
                }
            }
        };
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => BackHandler.addEventListener('hardwareBackPress', this.onBackPressed));
    }
    componentDidMount() {
        super.componentDidMount && super.componentDidMount();
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed));
    }
    componentWillUnmount() {
        super.componentWillUnmount && super.componentWillUnmount();
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    }
    render() {
        // return withNavigation(<WrappedComponent {...this.props} />);
        return super.render();
    }
};
export default decorator;
//# sourceMappingURL=BackHandler.js.map