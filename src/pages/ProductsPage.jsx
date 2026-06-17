import React, { useState, useEffect } from 'react'
import { useGetCategoriesQuery, useGetProductsQuery } from '../slices/productApiSlice';
import { Col, Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import AlertDismissible from '../components/Alert';
import Product from '../components/Product';
import Pagination from '../components/Pagination';
import useCompany from '../hooks/useCompany';
const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--clr-grey-10)',
    padding: '2rem 1.5rem',
  },

  layout: {
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    gap: '2rem',
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    alignItems: 'start',
  },

  sidebar: {
    background: 'var(--clr-white)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--light-shadow)',
    padding: '1.5rem',
    position: 'sticky',
    top: '1rem',
  },

  sidebarHeading: {
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--clr-primary-2)',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid var(--clr-primary-9)',
  },

  divider: {
    borderBottom: '1px solid var(--clr-grey-9)',
    margin: '1.25rem 0',
  },

  checkboxItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.35rem 0',
    cursor: 'pointer',
  },

  checkboxInput: {
    accentColor: 'var(--clr-primary-4)',
    width: '15px',
    height: '15px',
    cursor: 'pointer',
    flexShrink: 0,
  },

  checkboxLabel: {
    fontSize: '0.875rem',
    color: 'var(--clr-grey-3)',
    cursor: 'pointer',
    userSelect: 'none',
    textTransform: 'capitalize',
  },

  selectWrapper: {
    position: 'relative',
  },

  select: {
    width: '100%',
    padding: '0.55rem 2rem 0.55rem 0.75rem',
    border: '1.5px solid var(--clr-grey-8)',
    borderRadius: 'var(--radius)',
    background: 'var(--clr-white)',
    color: 'var(--clr-grey-2)',
    fontSize: '0.85rem',
    appearance: 'none',
    cursor: 'pointer',
    outline: 'none',
    transition: 'var(--transition)',
  },

  selectChevron: {
    position: 'absolute',
    right: '0.65rem',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: 'var(--clr-primary-4)',
    fontSize: '0.75rem',
  },

  rangeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  rangeLabel: {
    fontSize: '0.78rem',
    color: 'var(--clr-grey-5)',
    minWidth: '30px',
  },

  rangeBadge: {
    display: 'inline-block',
    marginTop: '0.5rem',
    padding: '0.2rem 0.75rem',
    background: 'var(--clr-primary-9)',
    color: 'var(--clr-primary-2)',
    borderRadius: '2rem',
    fontSize: '0.78rem',
    fontWeight: 600,
  },

  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'var(--clr-white)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--light-shadow)',
    padding: '0.85rem 1.25rem',
  },

  productCount: {
    fontSize: '0.85rem',
    color: 'var(--clr-grey-5)',
  },

  productCountBold: {
    fontWeight: 700,
    color: 'var(--clr-primary-2)',
  },

  activeBadge: {
    fontSize: '0.78rem',
    color: 'var(--clr-white)',
    background: 'var(--clr-primary-3)',
    padding: '0.2rem 0.65rem',
    borderRadius: '2rem',
    fontWeight: 600,
  },

  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
  },

  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '0.5rem',
  },
};

const mediaStyle = `
  @media (max-width: 768px) {
    .products-layout {
      grid-template-columns: 1fr !important;
    }
    .products-sidebar {
      position: static !important;
    }
  }
  input[type='range'] {
    accent-color: var(--clr-primary-4);
    flex: 1;
    cursor: pointer;
  }
  select:hover, select:focus {
    border-color: var(--clr-primary-4) !important;
  }
`;

const ProductsPage = () => {
  const { data: company } = useCompany();
  const currency = company?.currency || 'BDT';

  const [sort, setSort]                             = useState('');
  const [pageNumber, setPageNumber]                 = useState(1);
  const [range, setRange]                           = useState(1000); // live — drives the slider UI
  const [debouncedRange, setDebouncedRange]         = useState(1000); // delayed — sent to the API
  const [selectedCategories, setSelectedCategories] = useState([]);   // array of strings

  // ── Debounce range: only fire the API 400 ms after the user stops dragging
  useEffect(() => { 
    const timer = setTimeout(() => {
      setDebouncedRange(range);
      setPageNumber(1);
    }, 400);
    return () => clearTimeout(timer); // clear on every new drag event
  }, [range]);

  // ── API expects comma-separated string: "trouser,jersey"
  const categoriesParam = selectedCategories.join(',');

  const {
    data: productsData,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductsQuery({
    page: pageNumber,
    sort,
    max_price: debouncedRange,   // debounced — avoids an API call per pixel
    categories: categoriesParam, // properly formatted for the endpoint
  });

  const {
    data: categories,
    isLoading: catLoading,
    isError: catError,
  } = useGetCategoriesQuery();

  // ── Toggle a category in/out of the selected array
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
    setPageNumber(1); // always reset to page 1 when filters change
  };

  const totalProducts = productsData?.total ?? productsData?.data?.length ?? 0;

  return (
    <>
      <style>{mediaStyle}</style>

      <div style={styles.page}>
        {/* ── Loading ── */}
        {(isLoading || catLoading) && (
          <div style={styles.overlay}>
            <Loader />
          </div>
        )}

        {/* ── Error ── */}
        {isError && (
          <AlertDismissible
            variant="danger"
            message="An error occurred while fetching the products. Please try again later."
          />
        )}

        {/* ── Content ── */}
        {isSuccess && productsData?.data && (
          <div style={styles.layout} className="products-layout">

            {/* ════ Sidebar ════ */}
            <aside style={styles.sidebar} className="products-sidebar">

              {/* Categories */}
              <p style={styles.sidebarHeading}>Categories</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {catError && (
                  <li style={{ color: 'var(--clr-red-dark)', fontSize: '0.8rem', listStyle: 'none' }}>
                    Failed to load categories.
                  </li>
                )}
                {categories?.data?.map((cat) => (
                  <li key={cat.id} style={{ listStyle: 'none' }}>
                    {/*
                      Wrap both input + label in a single <label> so clicking
                      anywhere on the row toggles the checkbox — no htmlFor needed.
                    */}
                    <label style={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        value={cat.name}
                        checked={selectedCategories.includes(cat.name)}
                        onChange={handleCategoryChange}
                        style={styles.checkboxInput}
                      />
                      <span style={styles.checkboxLabel}>{cat.name}</span>
                    </label>
                  </li>
                ))}
              </ul>

              <div style={styles.divider} />

              {/* Sort */}
              <p style={styles.sidebarHeading}>Sort by</p>
              <div style={styles.selectWrapper}>
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setPageNumber(1); }}
                  style={styles.select}
                >
                  <option value="">Default</option>
                  <option value="name_asc">Name A → Z</option>
                  <option value="name_desc">Name Z → A</option>
                  <option value="price_low">Price: Low → High</option>
                  <option value="price_high">Price: High → Low</option>
                </select>
                <span style={styles.selectChevron}>▾</span>
              </div>

              <div style={styles.divider} />

              {/* Price range */}
              <p style={styles.sidebarHeading}>Price</p>
              <div style={styles.rangeRow}>
                <span style={styles.rangeLabel}>0</span>
                <input
                  type="range"
                  step={10}
                  value={range}
                  min={0}
                  max={1000}
                  onChange={(e) => setRange(Number(e.target.value))}
                  // Note: setPageNumber(1) happens inside the debounce effect
                />
                <span style={styles.rangeLabel}> 1000</span>
              </div>
              <span style={styles.rangeBadge}>Up to {currency} {range}</span>
            </aside>

            {/* ════ Main ════ */}
            <main style={styles.main}>

              {/* Top bar */}
              <div style={styles.topBar}>
                <span style={styles.productCount}>
                  Showing{' '}
                  <strong style={styles.productCountBold}>
                    {productsData.data.length}
                  </strong>
                  {totalProducts > 0 && (
                    <> of <strong style={styles.productCountBold}>{totalProducts}</strong></>
                  )}{' '}
                  products
                </span>

                {selectedCategories.length > 0 && (
                  <span style={styles.activeBadge}>
                    {selectedCategories.length} filter{selectedCategories.length > 1 ? 's' : ''} active
                  </span>
                )}
              </div>

              {/* Product grid */}
              <Row className="gy-4 gx-4">
                {productsData.data.map((product) => (
                  <Col key={product.id} xs={12} sm={6} md={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {productsData.pages > 1 && (
                <div style={styles.paginationWrapper}>
                  <Pagination
                    pages={productsData.pages}
                    page={productsData.page || pageNumber}
                    onPageChange={(page) => {
                      setPageNumber(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;