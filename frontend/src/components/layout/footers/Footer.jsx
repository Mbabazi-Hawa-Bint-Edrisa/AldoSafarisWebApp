import Paymentcards from "../components/Paymentcards";
import Socials from "../components/Socials";


export default function FooterFour() {
  return (
    <footer className="footer -type-1 -light bg-dark-1">
      <div className="footer__main">



      </div>

      <div className="border-white-15-top">
        <div className="container">
          <div className="footer__bottom">
            <div className="row y-gap-5 justify-between items-center">
              <div className="col-auto text-white">
                <div>© Copyright Aldo Safaris {new Date().getFullYear()}</div>
              </div>

              <div className="col-auto">
                <div className="footer__images d-flex items-center x-gap-10">
                  <Paymentcards />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
