import { Button } from "@/components/button";
import { Input } from "@/components/input/input";
import { InputGroup } from "@/components/input/input-group";
import { RadioInput } from "@/components/input/radio";
import { RadioGroup } from "@/components/input/radio-group";
import { MultiSelect } from "@/components/select/multi-select";
import { SingleSelect } from "@/components/select/single-select";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const MEMBERSHIPS = [
  {
    label: "Silver",
    value: "silver",
  },
  {
    label: "Gold",
    value: "gold",
  },
  {
    label: "Platinum",
    value: "platinum",
  },
];

const AREA_OF_INTERESTS = [
  {
    label: "Engineering",
    value: "engineering",
  },
  {
    label: "Comedy",
    value: "comedy",
  },
  {
    label: "Politics",
    value: "politics",
  },
  {
    label: "Science",
    value: "science",
  },
  {
    label: "History",
    value: "history",
  },
  {
    label: "Hospitality",
    value: "hospitality",
  },
];

const SimpleResponsiveFormPage = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-4 ${inter.className}`}
    >
      <Head>
        <title>Simple Responsive Form</title>
      </Head>
      <div className="flex flex-col items-center w-full">
        <form className="flex flex-col w-fit gap-y-8">
          <InputGroup label="Full Name" description="Input your full name">
            <div className="w-full min-w-80">
              <Input
                name="fullname"
                placeholder="Input full name"
                type="text"
              />
            </div>
          </InputGroup>
          <InputGroup label="Email" description="Input your active email">
            <div className="w-full min-w-80">
              <Input name="email" placeholder="Input email" type="email" />
            </div>
          </InputGroup>
          <InputGroup label="Birth Place" description="Input your birth place">
            <div className="w-full min-w-80">
              <Input
                name="birthPlace"
                placeholder="Input birth place"
                type="text"
              />
            </div>
          </InputGroup>
          <InputGroup label="Gender" description="Choose your gender">
            <div className="w-full min-w-80">
              <RadioGroup>
                <RadioInput name="gender" label="Male" value="male" />
                <RadioInput name="gender" label="Female" value="female" />
              </RadioGroup>
            </div>
          </InputGroup>
          <InputGroup label="Membership" description="Choose your membership">
            <div className="w-full min-w-80">
              <SingleSelect
                label="Membership"
                name="membership"
                options={MEMBERSHIPS}
                placeholder="Choose your membership"
                defaultValue=""
                value=""
                onChange={() => {}}
              />
            </div>
          </InputGroup>
          <InputGroup
            label="Area of Interest"
            description="Choose your area of interest"
          >
            <div className="w-full min-w-80">
              <MultiSelect
                className="w-full"
                name="areaOfInterest"
                options={AREA_OF_INTERESTS}
                label="Area of Interest"
                values={[]}
                placeholder="Choose your area of interest"
                onChange={() => {}}
              />
            </div>
          </InputGroup>
          <Button variant="fill">Submit</Button>
        </form>
      </div>
    </main>
  );
};

export default SimpleResponsiveFormPage;
