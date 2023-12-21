// here are the steps that were gonna have to take to create a new invoice --> 

// create a new form to capture the users input;
// then were gonna have to create a server action and invoke the data in the form
// inside our server action , extract the data to be inserted into my database;
// again were gonna have to validate and prepare the data to be inserted to the database;
// then were gonna insert the data and handle the errors
// revalidate the cache to get the latest data back and redirect the user back to invoices page;


import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}