const zerofill = num => num < 10 && num >= 0 ? `0${num}` : num;

const SvgCircle = props => {
  const { className, done, max, radius, stroke, strokeWidth } = props;
  const size = (radius + strokeWidth) * 2;
  const length = Math.ceil(2 * radius * Math.PI);
  const remainingLength =
  length - Math.ceil(2 * radius * Math.PI) * (done / max);
  return /*#__PURE__*/(

    React.createElement("svg", {
      className: className,
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      xmlns: "http://www.w3.org/2000/svg" }, /*#__PURE__*/

    React.createElement("g", null, /*#__PURE__*/
    React.createElement("circle", {
      className: "circle",
      r: radius,
      cx: radius + strokeWidth,
      cy: radius + strokeWidth,
      stroke: stroke,
      strokeDasharray: length,
      strokeDashoffset: remainingLength,
      strokeLinecap: "round",
      strokeWidth: strokeWidth,
      fill: "none" }), /*#__PURE__*/

    React.createElement("circle", {
      className: "circle--bg",
      r: radius,
      cx: radius + strokeWidth,
      cy: radius + strokeWidth,
      stroke: "rgba(0, 0, 0, .1)",
      strokeLinecap: "round",
      strokeWidth: strokeWidth,
      fill: "none" }))));




};

SvgCircle.defaultProps = {
  done: 0,
  max: 24,
  radius: 72,
  stroke: "#e91e63",
  strokeWidth: 8 };


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0 };

  }
  componentWillMount() {
    this.getTimeUntil(this.props.deadline);
  }
  componentDidMount() {
    this.timerId = setInterval(
    () => this.getTimeUntil(this.props.deadline),
    1000);

  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());
    const seconds = Math.floor(time / 1000 % 60);
    const minutes = Math.floor(time / 1000 / 60 % 60);
    const hours = Math.floor(time / (1000 * 60 * 60) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    this.setState({ days, hours, minutes, seconds });
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "clock" }, /*#__PURE__*/
      React.createElement("div", { className: "clock__display" }, /*#__PURE__*/
      React.createElement(SvgCircle, {
        className: "clock__circle",
        max: 365,
        done: this.state.days }), /*#__PURE__*/

      React.createElement("div", { className: "clock__text clock__text--days" }, /*#__PURE__*/
      React.createElement("span", { className: "clock__amount" }, zerofill(this.state.days)))), /*#__PURE__*/


      React.createElement("div", { className: "clock__display" }, /*#__PURE__*/
      React.createElement(SvgCircle, { max: 24, done: this.state.hours }), /*#__PURE__*/
      React.createElement("div", { className: "clock__text clock__text--hours" }, /*#__PURE__*/
      React.createElement("span", { className: "clock__amount" }, zerofill(this.state.hours)))), /*#__PURE__*/


      React.createElement("div", { className: "clock__display" }, /*#__PURE__*/
      React.createElement(SvgCircle, { max: 60, done: this.state.minutes }), /*#__PURE__*/
      React.createElement("div", { className: "clock__text clock__text--minutes" }, /*#__PURE__*/
      React.createElement("span", { className: "clock__amount" },
      zerofill(this.state.minutes)))), /*#__PURE__*/



      React.createElement("div", { className: "clock__display" }, /*#__PURE__*/
      React.createElement(SvgCircle, { max: 60, done: this.state.seconds }), /*#__PURE__*/
      React.createElement("div", { className: "clock__text clock__text--seconds" }, /*#__PURE__*/
      React.createElement("span", { className: "clock__amount" },
      zerofill(this.state.seconds)))), /*#__PURE__*/



      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", null, /*#__PURE__*/
      React.createElement("span", null, "More to come for the special day...")))));




  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline: "2022-10-29",
      error: undefined,
      newDeadline: "2022-10-28" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ newDeadline: e.target.value.trim() });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (isNaN(Date.parse(this.state.newDeadline))) {
      this.setState({
        error: "That doesn't seem to be a valid date" });

    } else if (Date.parse(this.state.newDeadline) < new Date()) {
      this.setState({ error: "This date is in the past" });
    } else {
      this.setState({
        deadline: this.state.newDeadline,
        newDeadline: undefined,
        error: undefined });

    }

    this.inputRef.value = "";
  }
  formatDate() {
    return new Date(Date.parse(this.state.deadline)).toDateString();
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "app" }, /*#__PURE__*/
      React.createElement(Clock, { deadline: this.state.deadline }),
      this.state.error && /*#__PURE__*/
      React.createElement("div", { className: "message message--error" }, this.state.error)));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));