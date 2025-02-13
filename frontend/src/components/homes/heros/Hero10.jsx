import { useNavigate } from "react-router-dom";

const tags = [
  {
    id: 1,
    iconClass: "icon-bank text-26",
    label: "Culture",
  },
  {
    id: 2,
    iconClass: "icon-menu-3 text-26",
    label: "Food",
  },
  {
    id: 3,
    iconClass: "icon-mountain text-26",
    label: "Nature",
  },
  {
    id: 4,
    iconClass: "icon-hot-air-balloon-2 text-26",
    label: "Adventure",
  },
];
export default function Hero10() {
  const navigate = useNavigate();
  return (
    <section className="hero -type-10">
      <div className="hero__bg">
        <img src="/img/hero/10/hero.jpg" alt="background" />
      </div>

      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-xl-9 col-lg-10">
            <div className="hero__content">
              <h1
                data-aos="fade-up"
                data-aos-delay="100"
                className="hero__title text-white"
              >
                Choose a Country For Your <br className="lg:d-none" />
                Next Adventure?
              </h1>

              <div
                data-aos="fade-up"
                data-aos-delay="250"
                className="hero__text text-white mt-20"
              >
                From local escapes to far-flung adventures
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
