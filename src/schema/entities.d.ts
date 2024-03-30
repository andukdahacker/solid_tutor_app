import { components } from "../schema/schema";

export type User = components["schemas"]["UserEntity"];
export type LearnerProfile = components["schemas"]["LearnerProfileEntity"];
export type WorkExperience = components["schemas"]["WorkExperienceEntity"];
export type TutorProfile = components["schemas"]["TutorProfileEntity"];
export type PageInfo = components["schemas"]["PageInfoType"];
export type Job = components["schemas"]["JobEntity"];
export type Subject = components["schemas"]["SubjectEntity"];
export type JobConnection = components["schemas"]["JobConnectionEntity"];
export type SortBy = components["schemas"]["SortBy"];
export type Paginated<T> = {
  nodes?: T[] | undefined;
  pageInfo: components["schemas"]["PageInfoType"] | undefined;
};
export type JobMethod = components["schemas"]["JobMethod"];
export type Education = components["schemas"]["EducationEntity"];
export type TutorProfileSubject =
  components["schemas"]["TutorProfileSubjectEntity"];
