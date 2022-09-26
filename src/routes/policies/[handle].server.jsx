import { 
    useLocalization, 
    gql,
    useShopQuery
} from "@shopify/hydrogen";
import react from "react";
import { Layout } from "../../components/index.server";
import { NotFound } from "../../components/index.server";


export default function Policy({params}) {

    const {
        language: {isoCode: languageCode}
    } = useLocalization();
    const {handle} = params;

    const policy = {
        privacyPolicy: handle === 'privacy-policy',
        shippingPolicy: handle === 'shipping-policy',
        termsOfService: handle === 'terms-of-service',
        refundPolicy: handle === 'refund-policy',
      };

    if (
    !policy.privacyPolicy &&
    !policy.shippingPolicy &&
    !policy.termsOfService &&
    !policy.refundPolicy
    ) {
        return <NotFound />;
    }

    const activePolicy = Object.keys(policy).find((key) => policy[key]);

    const {
        data: {shop},
      } = useShopQuery({
        query: POLICIES_QUERY,
        variables: {
          languageCode,
          ...policy,
        },
    });

    const page = shop?.[activePolicy];

    if (!page) {
        return <NotFound />;
      }



    return(
        <Layout>
            <section className="text-black">
                <h1 className="text-lg mb-4">{page.title}</h1>
                <div dangerouslySetInnerHTML={{__html: page.body}} />
            </section>
        </Layout>
    )
}

const POLICIES_QUERY = gql`
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }

  query PoliciesQuery(
    $languageCode: LanguageCode
    $privacyPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
    $refundPolicy: Boolean!
  ) @inContext(language: $languageCode) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }`;