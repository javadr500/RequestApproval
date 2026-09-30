export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <span>
          © {new Date().getFullYear()} Request Approval
        </span>

        <span>
          ASP.NET Core + React
        </span>
      </div>
    </footer>
  );
}
