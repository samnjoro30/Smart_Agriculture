export default function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer
        className="
          fixed bottom-0 left-0 right-0
          h-10
          bg-green-700
          border-t border-green-600
          rounded-t-2xl
          flex items-center justify-center
          text-sm text-green-100
          z-40
        "
      >
        <p>© {currentYear} Smart Farm. All Rights Reserved</p>
      </footer>
    );
  }
  