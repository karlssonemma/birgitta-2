import {Layout} from '~/components/index.server';
import ArrowLink from '../ArrowLink';

export function NotFound({response, type = 'page'}) {
  if (response) {
    response.doNotStream();
    response.status = 404;
    response.statusText = 'Not found';
  }

  return (
    <Layout>
      <section className="min-h-[600px] flex flex-col justify-center text-black">
        <h1 className="text-6xl mb-8">404</h1>
        <p className="mb-8 font-serif">We can't seem to find the page you're looking for :(</p>
        <ArrowLink to="/" direction="right" label="home" />
        <ArrowLink to="/collections/main" direction="right" label="shop" />
      </section>
    </Layout>
  );
}

