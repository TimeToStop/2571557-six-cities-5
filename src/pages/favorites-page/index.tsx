import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { IOffer } from '../../model';
import { Offer } from '../../components/offers/offer-item';
import { AppRoutes } from '../routes';
import { useAppSelector } from '../../store/hooks';

type GroupedOffers = [string, IOffer[]];

export const FavoritesPage = () => {
  const { offers } = useAppSelector((state) => state.offers);
  const grouped: GroupedOffers[] = useMemo(() => {
    const map = new Map<string, IOffer[]>();
    offers.forEach((offer) => {
      if (map.has(offer.city.name)) {
        map.get(offer.city.name)?.push(offer);
      } else {
        map.set(offer.city.name, [offer]);
      }
    });
    return Array.from(map);
  }, [offers]);
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link"
                to={'..'}
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoutes.FAVORITES}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {grouped.map((el) => (
                <li className="favorites__locations-items" key={el[0]}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{el[0]}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {el[1].map((elem) => (<Offer block='favorites' offer={elem} key={elem.id} />))}
                  </div>
                </li>)
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
};
