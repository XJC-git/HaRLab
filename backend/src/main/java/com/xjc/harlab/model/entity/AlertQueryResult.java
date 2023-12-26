package com.xjc.harlab.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigInteger;

@Data
@Entity
@NamedNativeQuery(
        name = "queryParticipantsWithAlert",
        query = """
            SELECT DISTINCT a1.user_id AS userId,
                   a1.last_report AS lastReport,
                   :date - a1.last_report > 2 * 24 * 60 * 60 * 1000 AS alert,
                   p.username AS username
            FROM (SELECT a.user_id AS user_id, MAX(time) AS last_report
                  FROM attacks a
                  GROUP BY a.user_id) a1
            JOIN participants p ON a1.user_id = p.id
            ORDER BY last_report""",
        resultSetMapping = "queryParticipantsWithAlertMapping"
)
@SqlResultSetMapping(
        name="queryParticipantsWithAlertMapping",
        classes = @ConstructorResult(
                targetClass = AlertQueryResult.class,
                columns = {
                        @ColumnResult(name="userId",type = Integer.class),
                        @ColumnResult(name="lastReport",type = BigInteger.class),
                        @ColumnResult(name="alert",type = Boolean.class),
                        @ColumnResult(name="username",type = String.class),
                }
        )
)
public class AlertQueryResult {
    @Id
    private Integer userId;

    private BigInteger lastReport;

    private String username;

    private boolean alert;
}
