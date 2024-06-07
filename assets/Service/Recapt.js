import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const TEST_SITE_KEY = "6LdvFRwpAAAAADtzl6JSRGU3dTEfqSJBo8v3VMxU";
const DELAY = 1500;

class Recapt extends React.Component {
    constructor(props, ...args) {
        super(props, ...args);
        this.state = {
            callback: "not fired",
            value: [],
            load: false,
            expired: false
        };
        this._reCaptchaRef = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ load: true });
        }, DELAY);
        // console.log("didMount - reCaptcha Ref-", this._reCaptchaRef);
    }

    handleChange = value => {
        // console.log("Captcha value:", value);
        this.setState({ value });
        if (value === null) this.setState({ expired: true });
        if (value !== null) {
            this.setState({ expired: false });
            this.props.setVisitorType && this.props.setVisitorType(true);
        }

    };

    asyncScriptOnLoad = () => {
        this.setState({ callback: "called!" });
        // console.log("scriptLoad - reCaptcha Ref-", this._reCaptchaRef);
    };

    render() {
        const { value, callback, load, expired } = this.state || {}
        return (
            <div className="Recap">
                {load === true && value.length === 0 ?
                    <ReCAPTCHA
                        style={{ display: "inline-block" }}
                        ref={this._reCaptchaRef}
                        sitekey={TEST_SITE_KEY}
                        onChange={this.handleChange}
                        asyncScriptOnLoad={this.asyncScriptOnLoad}
                    /> : ''
                }
            </div>
        );
    }
}


export default Recapt