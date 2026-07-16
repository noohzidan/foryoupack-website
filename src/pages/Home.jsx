import Hero from '../sections/Hero';
import FeaturesStrip from '../sections/FeaturesStrip';
import About from '../sections/About';
import Products from '../sections/Products';
import Industries from '../sections/Industries';
import Specifications from '../sections/Specifications';

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <FeaturesStrip />
      <About />
      <Products />
      <Industries />
      <Specifications />
    </main>
  );
}
