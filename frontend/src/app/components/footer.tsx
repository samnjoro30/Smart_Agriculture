

export default function Footer (){
    const currentYear = new Date().getFullYear();
    return(
        <div className="border-t bg-green-700 border-white-700 h-12 py-2 px-6 pt-2 text-center text-sm text-green-400">
            <p> &copy; {currentYear} Smart Farm. All Rights reserved </p>
        </div>
    )
}