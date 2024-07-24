import { Button } from "@/components/button";
import { Input } from "@/components/input/input";
import { InputGroup } from "@/components/input/input-group";
import { RadioInput } from "@/components/input/radio";
import { RadioGroup } from "@/components/input/radio-group";
import { MultiSelect } from "@/components/select/multi-select";
import { SingleSelect } from "@/components/select/single-select";
import { Inter } from "next/font/google";
import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";

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

const getMembership = (value: string) => {
  return MEMBERSHIPS.find((m) => m.value == value);
};

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

const getAreaOfInterest = (value: string) => {
  return AREA_OF_INTERESTS.find((m) => m.value == value);
};

export type FormState = {
  fullname: string;
  email: string;
  birthPlace: string;
  gender: string;
  membership: string;
  areaOfInterests: string[];
};

type ErrorField = Partial<Record<keyof FormState, string>>;

const defaultValue = {
  fullname: "",
  email: "",
  birthPlace: "",
  gender: "",
  membership: "",
  areaOfInterests: [],
};

const SimpleResponsiveFormPage = () => {
  const [formState, setFormState] = useState<FormState>(defaultValue);

  const [errorFields, setErrorFields] = useState<ErrorField>({});

  const getErrorMessage = (key: keyof FormState) =>
    errorFields[key as keyof FormState];

  const handleInputChange =
    (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormState((prevState) => ({
        ...prevState,
        [key]: e.target.value,
      }));
    };

  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsDisplayed(true);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-4 ${inter.className}`}
    >
      <Head>
        <title>Simple Responsive Form</title>
      </Head>
      <div className="flex flex-col items-center w-full">
        <form className="flex flex-col w-fit gap-y-8" onSubmit={handleSubmit}>
          <InputGroup label="Full Name" description="Input your full name">
            <div className="w-full min-w-80">
              <Input
                name="fullname"
                placeholder="Input full name"
                type="text"
                value={formState.fullname}
                onChange={handleInputChange("fullname")}
                errorMessage={getErrorMessage("fullname")}
              />
            </div>
          </InputGroup>
          <InputGroup label="Email" description="Input your active email">
            <div className="w-full min-w-80">
              <Input
                name="email"
                placeholder="Input email"
                type="email"
                value={formState.email}
                onChange={handleInputChange("email")}
                errorMessage={getErrorMessage("email")}
              />
            </div>
          </InputGroup>
          <InputGroup label="Birth Place" description="Input your birth place">
            <div className="w-full min-w-80">
              <Input
                name="birthPlace"
                placeholder="Input birth place"
                type="text"
                value={formState.birthPlace}
                onChange={handleInputChange("birthPlace")}
                errorMessage={getErrorMessage("birthPlace")}
              />
            </div>
          </InputGroup>
          <InputGroup label="Gender" description="Choose your gender">
            <div className="w-full min-w-80">
              <RadioGroup>
                <RadioInput
                  name="gender"
                  label="Male"
                  value="male"
                  onChange={handleInputChange("gender")}
                  checked={formState.gender === "male"}
                />
                <RadioInput
                  name="gender"
                  label="Female"
                  value="female"
                  onChange={handleInputChange("gender")}
                  checked={formState.gender === "female"}
                />
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
                defaultValue={formState.membership}
                value={formState.membership}
                onChange={(value) => {
                  setFormState((prevState) => ({
                    ...prevState,
                    membership: value,
                  }));
                }}
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
                name="areaOfInterests"
                options={AREA_OF_INTERESTS}
                label="Area of Interest"
                values={formState.areaOfInterests}
                placeholder="Choose your area of interest"
                onChange={(values) => {
                  setFormState((prevState) => ({
                    ...prevState,
                    areaOfInterests: values,
                  }));
                }}
              />
            </div>
          </InputGroup>
          <Button variant="fill">Submit</Button>
        </form>
      </div>
      {isDisplayed && (
        <div className="flex flex-col items-center border border-neutral-400 max-w-xl w-full p-8 mt-8">
          <h2 className="w-full text-2xl font-semibold text-center">Details</h2>
          <div className="w-full flex flex-col gap-y-2 mt-4">
            <div>Full Name: {formState.fullname}</div>
            <div>Email: {formState.email}</div>
            <div>Birth Place: {formState.birthPlace}</div>
            <div>
              Gender:{" "}
              {formState.gender
                ? formState.gender === "male"
                  ? "Male"
                  : "Female"
                : ""}
            </div>
            <div>Membership: {getMembership(formState.membership)?.label}</div>
            <div>
              Area of Interest:{" "}
              {formState.areaOfInterests
                .map((a) => {
                  return getAreaOfInterest(a)?.label;
                })
                .join(", ")}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default SimpleResponsiveFormPage;
