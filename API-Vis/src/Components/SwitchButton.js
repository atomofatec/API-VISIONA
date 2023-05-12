import '../Styles/SwitchButton.module.css';

export default function SwitchButton() {
  return (
    <label className="switch">
      <input type="checkbox" />
      <span className="slider"></span>
    </label>
  );
}