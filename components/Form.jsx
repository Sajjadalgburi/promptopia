import Link from "next/link";

const Form = ({ type, post, setPost, subitting, handleSubmit }) => {
  return (
    <section className=" w-full max-w-full flex-start flex-col">
      <h1 className=" head_text">
        <span className=" blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className=" font-normal">
              (#product, #idea, #web-development)
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_input"
          />

          <div className="flex-end mx-3 my-5 gap-4">
            <Link
              href={"/"}
              className=" text-gray-500 text-sm hover:text-red-600"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={subitting}
              className="px-5 py-1.5 text-sm rounded-full text-white bg-primary-orange"
            >
              {subitting ? `${type}...` : type}
            </button>
          </div>
        </label>
      </form>
    </section>
  );
};

export default Form;
