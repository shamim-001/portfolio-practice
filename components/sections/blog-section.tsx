import type React from "react"

const BlogSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12 pb-0 md:py-16 md:pb-0 lg:py-20 lg:pb-0">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Latest Blog Posts</h2>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
            Stay up-to-date with our latest news and insights.
          </p>
        </div>

        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {/* Example Blog Post - Replace with dynamic data */}
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1496128858413-b36217c725aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                alt=""
              />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600">
                  <a href="#" className="hover:underline">
                    Article
                  </a>
                </p>
                <a href="#" className="text-xl font-semibold text-gray-900">
                  Boost your conversion rate
                </a>
                <p className="mt-3 text-base text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut
                  atque eveniet.
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <a href="#">
                    <span className="sr-only">Roel Aufderehar</span>
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099173936-5a18a2ac0504?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </a>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    <a href="#" className="hover:underline">
                      Roel Aufderehar
                    </a>
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime="2020-03-16">Mar 16, 2020</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>6 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Example Blog Post */}

          {/* Example Blog Post - Replace with dynamic data */}
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1547586696-ea22b4d2461a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                alt=""
              />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600">
                  <a href="#" className="hover:underline">
                    Video
                  </a>
                </p>
                <a href="#" className="text-xl font-semibold text-gray-900">
                  How to use search engine optimization to drive sales
                </a>
                <p className="mt-3 text-base text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat
                  doloribus, eveniet dolore.
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <a href="#">
                    <span className="sr-only">Brenna Goyette</span>
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </a>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    <a href="#" className="hover:underline">
                      Brenna Goyette
                    </a>
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime="2020-03-10">Mar 10, 2020</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>4 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Example Blog Post */}

          {/* Example Blog Post - Replace with dynamic data */}
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1492724441997-5dc8653067ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                alt=""
              />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600">
                  <a href="#" className="hover:underline">
                    Case Study
                  </a>
                </p>
                <a href="#" className="text-xl font-semibold text-gray-900">
                  Improve your customer experience
                </a>
                <p className="mt-3 text-base text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatibus quo recusandae
                  magni placeat saepe molestiae.
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <a href="#">
                    <span className="sr-only">Daniela Metz</span>
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </a>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    <a href="#" className="hover:underline">
                      Daniela Metz
                    </a>
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime="2020-02-12">Feb 12, 2020</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>11 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Example Blog Post */}
        </div>
      </div>
    </div>
  )
}

export default BlogSection

