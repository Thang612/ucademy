enum EUserStatus {
    ACTIVE = "ACTIVE",
    UNACTIVE = "UNACTIVE",
    BANNED = "BANNED"
}

enum EUserRole {
    ADMIN = "ADMIN",
    USER = "USER",
    EXPERT = "EXPERT"
}

enum ECourseStatus {
    APPROVED = "APPROVED",
    PENDING = "PENDING",
    REJECTED = "REJECTED",
}
enum ECourseLevel {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
}


export { EUserStatus, EUserRole, ECourseStatus, ECourseLevel }