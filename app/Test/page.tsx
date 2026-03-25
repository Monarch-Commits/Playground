import React from 'react';
import { ensureCategories } from '../actions/Product/create_Update_Product.action';

export default async function page() {
  await ensureCategories();
  console.log('✅ Categories seeded');

  return <div>page</div>;
}
