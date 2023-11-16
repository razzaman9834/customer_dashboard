<pre><div class="bg-black rounded-md"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-markdown"><span class="hljs-section"># Customer Management API Documentation</span>

<span class="hljs-section">## Overview</span>

This API provides endpoints to manage customer data, including listing customers, retrieving customer details, editing customer information, and obtaining a list of unique cities with the number of customers.

<span class="hljs-section">## Base URL</span>

The base URL for the API is <span class="hljs-code">`http://localhost:4000/api`</span>.

<span class="hljs-section">## Endpoints</span>

<span class="hljs-section">### 1. List Customers</span>

<span class="hljs-section">#### Endpoint: `/customers`</span>

<span class="hljs-bullet">-</span> <span class="hljs-strong">**Method:**</span> GET
<span class="hljs-bullet">-</span> <span class="hljs-strong">**Description:**</span> Get a paginated list of customers with optional search parameters.
<span class="hljs-bullet">-</span> <span class="hljs-strong">**Parameters:**</span>
<span class="hljs-bullet">  -</span> <span class="hljs-code">`page`</span> (optional): Page number for pagination.
<span class="hljs-bullet">  -</span> <span class="hljs-code">`search`</span> (optional): Search customers by first<span class="hljs-emphasis">_name, last_</span>name, or city.

<span class="hljs-section">#### Curl Example:</span>

<span class="hljs-code">```bash
curl -X GET "http://localhost:4000/api/customers?page=1&search=Aman"
</span></code></div></div></pre>

### 2. Get Single Customer

#### Endpoint: `/customers/:id`

* **Method:** GET
* **Description:** Get details of a single customer by their ID.

#### Curl Example:

<pre><div class="bg-black rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span></div></div></pre>

<pre><div class="bg-black rounded-md"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">curl -X GET <span class="hljs-string">"http://localhost:4000/api/customers/1"</span>
</code></div></div></pre>

### 3. List Unique Cities with Customer Count

#### Endpoint: `/cities`

* **Method:** GET
* **Description:** Get a list of unique cities with the number of customers from each city.

#### Curl Example:

<pre><div class="bg-black rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span></div></div></pre>

<pre><div class="bg-black rounded-md"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">curl -X GET <span class="hljs-string">"http://localhost:4000/api/cities"</span>
</code></div></div></pre>

### 4. Edit Customer

#### Endpoint: `/customers/:id`

* **Method:** PUT
* **Description:** Edit customer details, including file upload.
* **Parameters:**
  * `id` (required): ID of the customer to be edited.
  * Form Data:
    * `first_name`: New first name of the customer.
    * `last_name`: New last name of the customer.
    * `city`: New city of the customer.
    * `company`: New company of the customer.
    * `file` (optional): File upload for additional data.

#### Curl Example:

<pre><div class="bg-black rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span></div></div></pre>

<pre><div class="bg-black rounded-md"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">curl -X PUT -F <span class="hljs-string">"first_name=NewName"</span> -F <span class="hljs-string">"last_name=NewLastName"</span> -F <span class="hljs-string">"city=NewCity"</span> -F <span class="hljs-string">"company=NewCompany"</span> -F <span class="hljs-string">"file=@path/to/file.jpg"</span> <span class="hljs-string">"http://localhost:4000/api/customers/1"</span>
</code></div></div></pre>

## Additional Features (Not Required)

### Edit Customer with File Upload

#### Endpoint: `/customers/:id`

* **Method:** PUT
* **Description:** Edit customer details with file upload.
* **Parameters:**
  * `id` (required): ID of the customer to be edited.
  * Form Data:
    * `first_name`: New first name of the customer.
    * `last_name`: New last name of the customer.
    * `city`: New city of the customer.
    * `company`: New company of the customer.
    * `file` (optional): File upload for additional data.

#### Curl Example:

<pre><div class="bg-black rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span></div></div></pre>

<pre><div class="bg-black rounded-md"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">curl -X PUT -F <span class="hljs-string">"first_name=NewName"</span> -F <span class="hljs-string">"last_name=NewLastName"</span> -F <span class="hljs-string">"city=NewCity"</span> -F <span class="hljs-string">"company=NewCompany"</span> -F <span class="hljs-string">"file=@path/to/file.jpg"</span> <span class="hljs-string">"http://localhost:4000/api/customers/1"</span>
</code></div></div></pre>

## Note

* Replace`http://localhost:4000` with the actual base URL where your server is hosted.
* Ensure that the necessary authorization and authentication mechanisms are implemented as per your application's requirements.
