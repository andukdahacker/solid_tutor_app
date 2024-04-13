import { Accessor, ParentProps, createContext, useContext } from "solid-js";
import createQuery from "../../../common/hooks/createQuery";
import { useParams } from "@solidjs/router";
import UserService from "../../../services/user_service";
import {
  Education,
  TutorProfile,
  TutorProfileSubject,
  User,
  WorkExperience,
} from "../../../schema/entities";
import { useAuth } from "../../../providers/AuthProvider";

type ProfileContextType = {
  data: Accessor<User | undefined>;
  error: Accessor<Error | undefined>;
  loading: Accessor<boolean>;
  addEducation: (education: Education) => void;
  removeEducation: (education: Education) => void;
  updateEducation: (education: Education) => void;
  addWorkExperience: (workExperience: WorkExperience) => void;
  removeWorkExperience: (workExperience: WorkExperience) => void;
  updateWorkExperience: (workExperience: WorkExperience) => void;
  addTutorProfileSubject: (subject: TutorProfileSubject) => void;
  removeTutorProfileSubject: (subject: TutorProfileSubject) => void;
  updateTutorProfileSubject: (subject: TutorProfileSubject) => void;
  updateTutorProfile: (tutorProfile: TutorProfile) => void;
};

const ProfileContext = createContext<ProfileContextType>();

const ProfileContextProvider = (props: ParentProps) => {
  const params = useParams();

  const { data, error, loading, setData } = createQuery({
    params: () => params.id,
    queryFn: async (input) => {
      if (!input) throw new Error("Cannot get user id from params");
      return await UserService.getUserProfileById(input);
    },
  });

  const updateTutorProfile = (tutorProfile: TutorProfile) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        tutorProfile: {
          ...tutorProfile,
        },
      };
    });
  };

  const addEducation = (education: Education) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        education: [...prev.education, education],
      };
    });
  };

  const removeEducation = (education: Education) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        education: prev.education.filter((edu) => edu.id !== education.id),
      };
    });
  };

  const updateEducation = (education: Education) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        education: prev.education.map((edu) =>
          edu.id === education.id ? education : edu,
        ),
      };
    });
  };

  const addWorkExperience = (workExperience: WorkExperience) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        workExperience: [...prev.workExperience, workExperience],
      };
    });
  };

  const removeWorkExperience = (workExperience: WorkExperience) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        workExperience: prev.workExperience.filter(
          (exp) => exp.id !== workExperience.id,
        ),
      };
    });
  };

  const updateWorkExperience = (workExperience: WorkExperience) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        workExperience: prev.workExperience.map((exp) =>
          exp.id === workExperience.id ? workExperience : exp,
        ),
      };
    });
  };

  const addTutorProfileSubject = (tutorProfileSubject: TutorProfileSubject) => {
    console.log(tutorProfileSubject);
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        tutorProfile: {
          ...prev.tutorProfile,
          tutorProfileSubject: [
            ...(prev.tutorProfile.tutorProfileSubject ?? []),
            tutorProfileSubject,
          ],
        },
      };
    });
  };

  const removeTutorProfileSubject = (
    tutorProfileSubject: TutorProfileSubject,
  ) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        tutorProfile: {
          ...prev.tutorProfile,
          tutorProfileSubject: prev.tutorProfile.tutorProfileSubject?.filter(
            (subject) => subject.subjectId !== tutorProfileSubject.subjectId,
          ),
        },
      };
    });
  };

  const updateTutorProfileSubject = (
    tutorProfileSubject: TutorProfileSubject,
  ) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        tutorProfile: {
          ...prev.tutorProfile,
          tutorProfileSubject: prev.tutorProfile.tutorProfileSubject?.map(
            (subject) =>
              subject.subjectId === tutorProfileSubject.subjectId
                ? tutorProfileSubject
                : subject,
          ),
        },
      };
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        data,
        error,
        loading,
        addEducation,
        removeEducation,
        updateEducation,
        addWorkExperience,
        removeWorkExperience,
        updateWorkExperience,
        addTutorProfileSubject,
        removeTutorProfileSubject,
        updateTutorProfileSubject,
        updateTutorProfile,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export function useProfileContext() {
  const value = useContext(ProfileContext);

  if (!value)
    throw new Error(
      "useProfileContext must be used within a ProfileContextProvider",
    );

  return value;
}

export default ProfileContextProvider;
